import gamesPieces from "../../gamePieces";

function Cell(props) {
  const type = props.type;

  return (
    <div
      type={"I"}
      style={{
        width: "auto",
        background: `rgba(${gamesPieces["I"].color}, 0.8)`,
        border: type === 0 ? "0px solid" : "4px solid",
        borderBottomColor: `rgba(${gamesPieces["I"].color}, 0.1)`,
        borderRightColor: `rgba(${gamesPieces["I"].color}, 1)`,
        borderTopColor: `rgba(${gamesPieces["I"].color}, 1)`,
        borderLeftColor: `rgba(${gamesPieces["I"].color}, 0.3)`,
      }}
    >
      I am a Cell
    </div>
  );
}

export default Cell;
