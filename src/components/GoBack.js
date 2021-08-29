import { Link } from "react-router-dom";

function GoBack() {
  return (
    <div className="go-back">
      <Link to="/">← Go Back</Link>
    </div>
  );
}

export default GoBack;
