import { Switch } from "@/shared/ui/switch";

export const Main = () => {
  return (
    <div
      style={{
        margin: "50px 0 0 0",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid white",
        borderRadius: "8px",
      }}
    >
      <Switch
        leftLabel={"Ты первый игрок?"}
        fromElement={"Нет"}
        toElement={"Да"}
        onChange={(e) => {
          console.log(e.currentTarget.checked);
        }}
      />
    </div>
  );
};
