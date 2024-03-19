package com.bank.MoneyAndMonitory.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.sql.Date;

import jakarta.persistence.*;

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



    public void setFirstName(String firstName) {
        this.firstName = firstName != null ? firstName.toUpperCase() : null;
    }

    public void setMiddleName(String middleName) {
        this.middleName =  middleName.toUpperCase();
    }

    public void setLastName(String lastName) {
        this.lastName = lastName != null ? lastName.toUpperCase() : null;
    }

    public void setGender(String gender) {
        this.gender = gender.toUpperCase();
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName != null ? fatherName.toUpperCase() : null;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName != null ? motherName.toUpperCase() : null;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus != null ? maritalStatus.toUpperCase() : null;
    }

    public void setPanCard(String panCard) {
        this.panCard = panCard;
    }

    public void setAadharNo(String aadharNo) {
        this.aadharNo = aadharNo;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public void setAddress(String address) {
        this.address = address != null ? address.toUpperCase() : null;
    }

    public void setEmail(String email) {
        this.email = email != null ? email.toUpperCase() : null;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setInitialAmount(double initialAmount) {
        this.initialAmount = initialAmount;
    }


   
    /**
     * @param clientId the clientId to set
     */
    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }


    /**
     * @param dob the dob to set
     */
    public void setDob(Date dob) {
        this.dob = dob;
    }

   
    /**
     * @param registrationDateTime the registrationDateTime to set
     */
    public void setRegistrationDateTime(Date registrationDateTime) {
        this.registrationDateTime = registrationDateTime;
    }

}
