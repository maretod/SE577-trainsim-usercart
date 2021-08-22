package edu.drexel.trainsim.db.models;

public class User {
    protected int user_id;
    protected String email;

    public User(int user_id, String email) {
        this.user_id = user_id;
        this.email = email;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
