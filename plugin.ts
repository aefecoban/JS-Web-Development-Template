export default class Plugin{

    private Hooks: { [key: string]: Function[] };

    constructor(){
        this.Hooks = {};
    }

    AddHook(HookName : string, Callback : Function) : void{
        if(this.Hooks[HookName] === undefined){
            this.Hooks[HookName] = [];
        }

        this.Hooks[HookName].push(Callback);
    }

    GetHook(HookName : string) : Function[] | undefined{
        return this.Hooks[HookName];
    }

    RunHook(HookName : string, ...args : any[]) : void{
        if(this.Hooks[HookName] === undefined){
            return;
        }

        this.Hooks[HookName].forEach((v) => v(...args));
    }

}
