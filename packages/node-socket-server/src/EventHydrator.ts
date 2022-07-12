import { Socket } from "socket.io";

export default class EventHydrator<S extends Socket, E, P> {

    private intervalRef: NodeJS.Timer | undefined;

    constructor(
        private intervalInSeconds: number, 
        private socketMap: Map<string, S>, 
        private event: keyof E,
        private generator: () => P
        ) {
    }

    private createInterval() {
        return setInterval(() => {
            const msg =  this.generator();
            this.socketMap.forEach(s => s.emit(this.event as string, msg));
        }, this.intervalInSeconds);
    }

    start() {
        if(this.intervalRef) console.error("Interval already started.");
        this.intervalRef = this.createInterval();
    }

    stop() {
        if(!this.intervalRef) console.error("Interval already stoped.");
        clearInterval(this.intervalRef);
        this.intervalRef = undefined;
    }

    startIfTurnedOff() {
        if(!this.intervalRef) {
            this.start();
        }
    }
}