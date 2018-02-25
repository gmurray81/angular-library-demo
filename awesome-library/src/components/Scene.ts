import { ClipRegions } from "./ClipRegion";

export class Scene {

    private _context: CanvasRenderingContext2D;

    constructor(private _canvas: HTMLCanvasElement,
    private _clientWidth: number,
    private _clientHeight: number,
    private _devicePixelRatio: number,
    private _requestFrame: (act: () => void) => void,
    private _clipRegions: ClipRegions,
    private _img: HTMLImageElement
    ) {
        this._context = this._canvas.getContext("2d");
        this._canvas.width = this._clientWidth * this._devicePixelRatio;
        this._canvas.height = this._clientHeight * this._devicePixelRatio;
        
    }

    private _startTime: number;

    startTicking(): void {
        this._startTime = new Date().getTime();
        this._requestFrame(() => this.tick());
    }

    tick(): void {
        let currTime = new Date().getTime();
        let elapsed = currTime - this._startTime;

        let done = this._clipRegions.update(elapsed);

        this._context.save();
        this._context.scale(this._devicePixelRatio, this._devicePixelRatio);
        this._context.clearRect(0,0,this._clientWidth, this._clientHeight);

        this._context.beginPath();

        this._clipRegions.draw(this._context);

        this._context.closePath();
        this._context.clip("nonzero");

        this._context.drawImage(this._img,
        0,0, this._clientWidth, this._clientHeight);

        this._context.restore();

        if (!done) {
            this._requestFrame(() => this.tick());
        }
    }
}