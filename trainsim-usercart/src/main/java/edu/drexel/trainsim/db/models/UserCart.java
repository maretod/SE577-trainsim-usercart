package edu.drexel.trainsim.db.models;

public class UserCart {
    protected int user_cart_id;
    protected String email;
    protected String source;
    protected String target;
    protected String depart_date;
    protected String return_date;
    protected String count_travellers;

    public UserCart(int user_cart_id, String email, String source, String target, String depart_date, String return_date, String count_travellers) {
        this.user_cart_id = user_cart_id;
        this.email = email;
        this.source = source;
        this.target = target;
        this.depart_date = depart_date;
        this.return_date = return_date;
        this.count_travellers = count_travellers;
    }

    public int getUser_cart_id() {
        return user_cart_id;
    }

    public void setUser_cart_id(int user_cart_id) {
        this.user_cart_id = user_cart_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getDepart_date() {
        return depart_date;
    }

    public void setDepart_date(String depart_date) {
        this.depart_date = depart_date;
    }

    public String getReturn_date() {
        return return_date;
    }

    public void setReturn_date(String return_date) {
        this.return_date = return_date;
    }

    public String getCount_travellers() {
        return count_travellers;
    }

    public void setCount_travellers(String count_travellers) {
        this.count_travellers = count_travellers;
    }
}
