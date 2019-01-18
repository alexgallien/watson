import React from 'react';

type ThreadsOverviewSettingsProps = {
  nameFilter: string;
  stackFilter: string;
  onNameFilterChange: React.ChangeEventHandler<HTMLInputElement>;
  onStackFilterChange: React.ChangeEventHandler<HTMLInputElement>;
};

const ThreadsOverviewSettings: React.SFC<ThreadsOverviewSettingsProps> =
  ({ nameFilter, stackFilter, onNameFilterChange, onStackFilterChange }) => (
    <div className="threads-overview-settings">
      <label>
        <input type="text" name="nameFilter" value={nameFilter} onChange={onNameFilterChange}
        />
        <b>thread name filter</b>
      </label>

      <label>
        <input type="text" name="stackFilter" value={stackFilter} onChange={onStackFilterChange}
        />
        <b>stack trace filter</b>
      </label>
    </div >
  );

export default ThreadsOverviewSettings;