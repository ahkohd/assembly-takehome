interface EmptyStateProps {
  title: string;
  description: string;
  action?(): void;
  actionText?: string;
}

const EmptyState = (props: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-lg text-center font-semibold text-gray-600">
        {props.title}
      </h1>
      <p className="text-center text-gray-600 text-sm">{props.description}</p>
      {props.action && (
        <button onClick={props.action}>{props.actionText}</button>
      )}
    </div>
  );
};

export default EmptyState;
