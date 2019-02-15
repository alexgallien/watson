import React from 'react';
import Thread from '../../types/Thread';
import ThreadDetailsWindow from '../ThreadDetails/ThreadDetailsWindow';

type ThreadSummaryProps = {
  thread: Thread;
};

type ThreadSummaryState = {
  showDetails: boolean;
  showLockOwner: boolean;
};

export default class ThreadSummary
  extends React.PureComponent<ThreadSummaryProps, ThreadSummaryState> {

  public state: ThreadSummaryState = {
    showDetails: false,
    showLockOwner: false,
  };

  public toggleDetails = () => {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  }

  public toggleLockOwner = () => {
    this.setState(prevState => ({ showLockOwner: !prevState.showLockOwner }));
  }

  public handleUnload = () => {
    this.setState({ showDetails: false, showLockOwner: false });
  }

  public render() {
    const thread = this.props.thread;
    const lockOwner = thread.lockWaitingFor ? thread.lockWaitingFor.owner : null;
    const locksHeld = this.getLocksHeldString(thread);

    return (
      <li>
        <a onClick={this.toggleDetails}>"{thread.name}"</a>
        {thread.date ? ` ${thread.date.toLocaleTimeString()}` : ''}
        {this.waitingForRender(thread, lockOwner)}
        {thread.locksHeld.length > 0 && `, holding [${locksHeld}]`}

        {this.state.showDetails &&
          <ThreadDetailsWindow thread={thread} onUnload={this.handleUnload} />}
        {this.state.showLockOwner && lockOwner &&
          <ThreadDetailsWindow thread={lockOwner} onUnload={this.handleUnload} />}
      </li>
    );
  }

  private waitingForRender(thread: Thread, lockOwner: Thread | null) {
    const lockWaitingFor = thread.lockWaitingFor ? thread.lockWaitingFor.id : null;

    if (!lockWaitingFor) {
      return null;
    }

    if (lockOwner) {
      console.error(thread);
      return (
        <>
          , awaiting notification on <a onClick={this.toggleLockOwner}>[{lockWaitingFor}]</a>
        </>
      );
    }
    return `, awaiting notification on [${lockWaitingFor}] without an owner`;
  }

  private getLocksHeldString = (thread: Thread): string | null => {
    if (thread.locksHeld.length === 0) {
      return null;
    }
    return thread.locksHeld.map(lock => lock.id).reduce(this.locksReducer);
  }

  private locksReducer(accumulator: string, lockId: string, index: number): string {
    return (index === 0) ? lockId : `${accumulator}, ${lockId}`;
  }
}