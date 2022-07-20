import type { Component } from 'solid-js';

interface Props {
    username: string;
    tier: number;
    isColorBlind: boolean;
}

const Username: Component<Props> = (props) => {

    const backgroundColor = (tier: number, isColorBlind: boolean) => {
        if(isColorBlind) return 'black';
        const tierColors = ["purple", "blue", "pink", "green", "orange"];
        return tierColors[tier] ?? "grey";
    };

    return (
        <span
        class="rounded-md px-2 text-white"
        style={{ "background-color": backgroundColor(props.tier, props.isColorBlind) }}>
            { props.username }
        </span>
    );
};

export default Username;