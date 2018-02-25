
function cubicEaseInOut(t: number) {
    if (t < .5) {
        t *= 2.0;
        let v = (t * t * t) / 2.0;
        return v;
    } else {
        t = ((1.0 - t) * 2.0);
        let v = ((1.0 - (t * t * t)) / 2.0) + .5;
        return v;
    }
}

export class ClipRegion {
    
    currRad: number;

    updateRadius(elapsed: number): boolean {
        let done = false;
        let p = (elapsed - this.delay) / this.duration;
        
        if (p > 1.0) {
            p = 1.0;
            done = true;
        }
        if (p < 0) {
            return;
        }

        p = cubicEaseInOut(p);
        
        this.currRad = this.rad * p;
        return done;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.x + this.rad, this.y);
        ctx.ellipse(this.x, this.y, 
            this.currRad, this.currRad,
             0, 0, 360);
    }

    constructor(
        public x: number, 
        public y: number, 
        public rad: number, 
        public duration: number, 
        public delay: number) {
            
        }
}

export class ClipRegions {
    private _regions: ClipRegion[] = [];

    addRegion(x: number, y: number, rad: number, 
        duration: number, delay: number) {
        this._regions.push(new ClipRegion(
            x, y, rad, duration, delay
        ));
    }

    update(elapsed: number) {
        let done = true;
        this._regions.map((r) => {
            if (!r.updateRadius(elapsed)) {
                done = false;
            }
        });
        return done;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this._regions.map((r) => {
            r.draw(ctx);
        })
    }
}