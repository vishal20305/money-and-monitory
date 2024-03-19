package com.bank.MoneyAndMonitory.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Date;

public class BankCustomerTest {

    @Test
    public void testBankCustomerGetterAndSetter() {
        BankCustomer customer = new BankCustomer();
        
        customer.setClientId(1L);
        customer.setFirstName("JOHN");
        customer.setMiddleName("M");
        customer.setLastName("DOE");
        customer.setDob(Date.valueOf("1990-01-15"));
        customer.setGender("Male");
        customer.setFatherName("JOHN Sr.");
        customer.setMotherName("Jane");
        customer.setMaritalStatus("Single");
        customer.setPanCard("ABCDE1234F");
        customer.setAadharNo("123456789012");
        customer.setMobileNumber("1234567890");
        customer.setEmergencyContact("9876543210");
        customer.setAddress("123 Main St");
        customer.setRegistrationDateTime(new Date(System.currentTimeMillis()));
        customer.setEmail("JOHN.DOE@example.com");
        customer.setPassword("password123");
        customer.setInitialAmount(1000.0);
        
        assertEquals(1L, customer.getClientId());
        assertEquals("JOHN", customer.getFirstName());
        assertEquals("M", customer.getMiddleName());
        assertEquals("DOE", customer.getLastName());
        assertEquals(Date.valueOf("1990-01-15"), customer.getDob());
        assertEquals("MALE", customer.getGender());
        assertEquals("JOHN SR.", customer.getFatherName());
        assertEquals("JANE", customer.getMotherName());
        assertEquals("SINGLE", customer.getMaritalStatus());
        assertEquals("ABCDE1234F", customer.getPanCard());
        assertEquals("123456789012", customer.getAadharNo());
        assertEquals("1234567890", customer.getMobileNumber());
        assertEquals("9876543210", customer.getEmergencyContact());
        assertEquals("123 MAIN ST", customer.getAddress());
        assertNotNull(customer.getRegistrationDateTime());
        assertEquals("JOHN.DOE@EXAMPLE.COM", customer.getEmail());
        assertEquals("password123", customer.getPassword());
        assertEquals(1000.0, customer.getInitialAmount(), 0.001); 
    }

}
