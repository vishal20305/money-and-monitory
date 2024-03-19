package com.example.payment.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

import jakarta.persistence.*;

@Setter
@Getter

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class BankCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "gender")
    private String gender;

    @Column(name = "father_name")
    private String fatherName;

    @Column(name = "mother_name")
    private String motherName;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "pan_card")
    private String panCard;

    @Column(name = "aadhar_no")
    private String aadharNo;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    @Column(name = "address")
    private String address;

    @Column(name = "registration_date_time")
    private Date registrationDateTime;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    // Add the new double field for initial amount
    @Column(name = "initial_amount")
    private double initialAmount;
}


