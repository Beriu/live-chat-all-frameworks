import { FunctionComponent } from "react";

interface Props {
    tier: number;
    username: string;
    isColorBlind: boolean;
}

const Username: FunctionComponent<Props> = ({ tier, username, isColorBlind }) => {

    const bgColor = (tier: number) => {
        const tierColors = ["purple", "blue", "pink", "green", "orange"];
        return tierColors[tier] ?? "grey";
    };

    const computedStyle = {
        borderRadius: "2.5px",
        backgroundColor: isColorBlind ? "black" : bgColor(tier),
        color: "white",
        padding: "0 5px 0 5px"
    };

    return <span style={computedStyle}>{ username }</span>;
};

export default Username;