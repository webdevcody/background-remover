import classNames from "classnames";

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: T[];
  value: T;
  onChange: (name: T) => void;
}) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab}
          onClick={() => {
            onChange(tab);
          }}
          className={classNames("tab-bordered tab", {
            "tab-active": tab === value,
          })}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
