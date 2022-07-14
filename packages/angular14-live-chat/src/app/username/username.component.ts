import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-username',
    templateUrl: './username.component.html',
    styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnChanges {

    @Input() username!: string;
    @Input() tier!: number;
    @Input() isColorBlind!: boolean;

    public backgroundColor: string = this.bgColor(this.tier);

    constructor() {}

    private bgColor(tier: number) {
        const tierColors = ["purple", "blue", "pink", "green", "orange"];
        return tierColors[tier] ?? "grey";
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.backgroundColor = this.isColorBlind !== true
            ? this.bgColor(this.tier)
            : "black";
    }

}
