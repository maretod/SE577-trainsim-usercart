package edu.drexel.trainsim.itinerary.models;

public class Stop {
    private int stop_id;
    private String otpId;
    private String name;

    public Stop(int id, String otpId, String name) {
        this.stop_id = id;
        this.otpId = otpId;
        this.name = name;
    }

    public int getId() {
        return stop_id;
    }

    public String getName() {
        return name;
    }

    public String getOtpId() {
        return otpId;
    }
}
