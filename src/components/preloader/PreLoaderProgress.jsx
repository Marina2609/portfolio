import "./PreLoader.css";

const PreLoaderProgress = (props) => {
  const { show } = props;
  return (
    <div
      className="progress"
      style={{ display: show ? "inline-block" : "none" }}
    >
      <div className="indeterminate" />
    </div>
  );
};

export default PreLoaderProgress;
