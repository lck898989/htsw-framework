class HEvent extends egret.EventDispatcher {

    public static getInstance(): HEvent {
        HEvent.init();
        return HEvent.Instance;
    }

    private static Instance: HEvent = null;

    private static init(): void {
        if (HEvent.Instance == null) {
            HEvent.Instance = new HEvent();
        }
    }
    public constructor() {
        super();
    }
}
