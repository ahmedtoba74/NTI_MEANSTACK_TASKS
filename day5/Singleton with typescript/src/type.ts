class SessionManager {
    private static instance: SessionManager;
    private user: { id: number; name: string } | null = null;

    private constructor() {
        console.log("Session Manager initialized.");
    }

    public static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        } else {
            console.log("Session already exists.");
        }
        return SessionManager.instance;
    }

    public login(userId: number, userName: string): void {
        if (!this.user) {
            this.user = { id: userId, name: userName };
            console.log(`User ${userName} logged in.`);
        } else {
            console.log(`User ${this.user.name} is already logged in.`);
        }
    }

    public logout(): void {
        if (this.user) {
            console.log(`User ${this.user.name} logged out.`);
            this.user = null;
        } else {
            console.log("No user is currently logged in.");
        }
    }

    public getUser(): { id: number; name: string } | null {
        return this.user;
    }
}

const session1 = SessionManager.getInstance();

session1.login(101, "Ahmed Toba");
session1.login(102, "Ali Yasser");
console.log("Current User:", session1.getUser());

const session2 = SessionManager.getInstance();
session2.login(102, "Ali Yasser");
console.log("Current User:", session2.getUser());

session2.logout();
session2.logout();

const session3 = SessionManager.getInstance();
session3.login(103, "Nada Ibrahim");
console.log("Current User:", session3.getUser());
session3.logout();
