export default class SessionAPI{
    
    Sessions : { [key : string] : string } = {};

    constructor(){}

    AddSession(SessionID : string, UserID : string){
        this.Sessions[SessionID] = UserID;
    }

    CreateSession(UserID : string){
        let SessionID = this.GenerateToken(UserID);
        this.AddSession(SessionID, UserID);
        return SessionID;
    }

    RemoveSession(SessionID : string){
        delete this.Sessions[SessionID];
    }

    GetUserID(SessionID : string) : string | undefined{
        return this.Sessions[SessionID];
    }

    GenerateToken(UserID : string) : string{
        return (Math.random().toString(36).substring(2, 15) + UserID + Math.random().toString(36).substring(2, 15)).toString();
    }

}
