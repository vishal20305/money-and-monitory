package com.bank.MoneyAndMonitory.Controller;

import com.bank.MoneyAndMonitory.Exception.ResourceNotFoundException;
import com.bank.MoneyAndMonitory.Repository.BankCustomerRepository;
import com.bank.MoneyAndMonitory.Service.ClientService;
import com.bank.MoneyAndMonitory.model.BankCustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/customers")
public class BankCustomerController {

    private final BankCustomerRepository customerRepository;
    private final ClientService clientService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public BankCustomerController(BankCustomerRepository customerRepository,ClientService clientService, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.clientService=clientService;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new BankCustomer (registration method)
    @PostMapping("/register")
    public ResponseEntity<BankCustomer> registerCustomer(@RequestBody BankCustomer customer) {
        // Here, you can perform validation and business logic as needed
        customer.setRegistrationDateTime(new Date(System.currentTimeMillis()));
        String hashedPassword = passwordEncoder.encode(customer.getPassword());
        customer.setPassword(hashedPassword);
        BankCustomer registeredCustomer = customerRepository.save(customer);
        clientService.createTwoBankAccounts(customer);
        return ResponseEntity.ok(registeredCustomer);
    }

    // Get all BankCustomers
    @GetMapping
    public List<BankCustomer> getAllCustomers() {
        return customerRepository.findAll();
    }

    
    // Get a BankCustomer by ID
    @GetMapping("/{id}")
    public ResponseEntity<BankCustomer> getCustomerById(@PathVariable Long id) {
        BankCustomer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: "+ id));
        return ResponseEntity.ok(customer);
    }

    // Update a BankCustomer by ID
@PutMapping("/{id}")
public ResponseEntity<BankCustomer> updateCustomer(@PathVariable Long id, @RequestBody BankCustomer updatedCustomer) {
    BankCustomer existingCustomer = customerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));

    // Update the fields with values from updatedCustomer
    existingCustomer.setFirstName(updatedCustomer.getFirstName());
    existingCustomer.setMiddleName(updatedCustomer.getMiddleName());
    existingCustomer.setLastName(updatedCustomer.getLastName());
    existingCustomer.setDob(updatedCustomer.getDob());
    existingCustomer.setGender(updatedCustomer.getGender());
    existingCustomer.setFatherName(updatedCustomer.getFatherName());
    existingCustomer.setMotherName(updatedCustomer.getMotherName());
    existingCustomer.setMaritalStatus(updatedCustomer.getMaritalStatus());
    existingCustomer.setPanCard(updatedCustomer.getPanCard());
    existingCustomer.setAadharNo(updatedCustomer.getAadharNo());
    existingCustomer.setMobileNumber(updatedCustomer.getMobileNumber());
    existingCustomer.setEmergencyContact(updatedCustomer.getEmergencyContact());
    existingCustomer.setAddress(updatedCustomer.getAddress());
    existingCustomer.setEmail(updatedCustomer.getEmail());
    // Exclude fields that should not be updated, such as initialAmount and password

    BankCustomer savedCustomer = customerRepository.save(existingCustomer);
    return ResponseEntity.ok(savedCustomer);
}


    // Delete a BankCustomer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        BankCustomer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));

        customerRepository.delete(customer);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<BankCustomer> getCustomerByEmail(@PathVariable String email) {
        BankCustomer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with email: " + email));
        return ResponseEntity.ok(customer);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> request) {
        try {
            // Extract the "newPassword" and "clientId" values from the request
            String newPassword = request.get("newPassword");
            Long clientId = Long.parseLong(request.get("clientId"));

            // Retrieve the customer by clientId
            BankCustomer customer = customerRepository.findByClientId(clientId);

            if (customer == null) {
                return ResponseEntity.badRequest().body("Customer not found with clientId: " + clientId);
            }

            // Hash the new password and update it
            String hashedPassword = passwordEncoder.encode(newPassword);
            customer.setPassword(hashedPassword);

            // Save the updated customer with the new password
            customerRepository.save(customer);

            return ResponseEntity.ok("Password updated successfully.");
        } catch (NumberFormatException e) {
            // Handle parsing exceptions (e.g., if clientId is not a valid Long)
            return ResponseEntity.badRequest().body("Invalid clientId format.");
        } catch (Exception e) {
            // Handle other exceptions
            return ResponseEntity.badRequest().body("Invalid request format.");
        }
    }
}
