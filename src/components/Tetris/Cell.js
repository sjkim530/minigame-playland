import gamesPieces from "../../gamePieces";

function Cell(props) {
  const type = props.type;

  return (
    <div
      type={type}
      style={{
        width: "auto",
        background: `rgba(${gamesPieces[type].color}, 0.8)`,
        border: type === 0 ? "0px solid" : "4px solid",
        borderBottomColor: `rgba(${gamesPieces[type].color}, 0.1)`,
        borderRightColor: `rgba(${gamesPieces[type].color}, 1)`,
        borderTopColor: `rgba(${gamesPieces[type].color}, 1)`,
        borderLeftColor: `rgba(${gamesPieces[type].color}, 0.3)`,
      }}
    ></div>
  );
}

export default Cell;
