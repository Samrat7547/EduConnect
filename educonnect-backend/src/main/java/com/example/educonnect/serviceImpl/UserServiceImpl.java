package com.example.educonnect.serviceImpl;

import com.example.educonnect.jwt.CustomerUserDetailsService;
import com.example.educonnect.jwt.JwtFilter;
import com.example.educonnect.jwt.JwtUtil;
import com.example.educonnect.model.User;
import com.example.educonnect.repo.UserRepository;
import com.example.educonnect.service.UserService;
import com.example.educonnect.wrapper.UserWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerUserDetailsService customerUserDetailsService;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    JwtFilter jwtFilter;
//    @Autowired
//    private RoleRepository roleRepository;

    @Override
    public ResponseEntity<String> signup(Map<String, String> requestMap) {
        try{
            if(this.validateSignupMap(requestMap,false)){
                User user= userRepo.findByEmailId(requestMap.get("email"));
                if(Objects.isNull(user)){
                    userRepo.save(this.getUserFromMap(requestMap,false));
                    return new ResponseEntity<>("Successfully Registered", HttpStatus.OK);
                }else{
                    return new ResponseEntity<>("Email already exists",HttpStatus.BAD_REQUEST);
                }
            }else {
                return  new ResponseEntity<>("Invalid Data",HttpStatus.BAD_REQUEST);
            }
        }catch (Exception exception) {
            exception.printStackTrace();
        }
        return  new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignupMap(Map<String, String> requestMap, boolean validateId) {
//        if(requestMap.containsKey("firstName")
//                && requestMap.containsKey("lastName")
//                && requestMap.containsKey("userName")
//                && requestMap.containsKey("email")
//                && requestMap.containsKey("password")
//                && requestMap.containsKey("phone")){
////                && requestMap.containsKey("profile")){
//            return true;
        if(requestMap.containsKey("email")){
            if(requestMap.containsKey("id")&& validateId){
                return true;
            }else return !validateId;
        }
        return  false;
    }

//    private boolean validateSignMap(Map<String,String> requestMap,boolean validateId){
//        if(requestMap.containsKey("name")){
//            if(requestMap.containsKey("id")&& validateId){
//                return true;
//            }else return !validateId;
//        }
//        return false;
//    }
    private User getUserFromMap(Map<String,String> requestMap, boolean isAdd) {
        User user = new User();
        if(isAdd){
            user.setId(Integer.parseInt(requestMap.get("id")));
        }else user.setStatus("true");
        user.setFirstName(requestMap.get("firstName"));
        user.setLastName(requestMap.get("lastName"));
        user.setUserName(requestMap.get("userName"));
        user.setEmail(requestMap.get("email"));
//        user.setPassword(requestMap.get("password"));
        user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setPhone(requestMap.get("phone"));
        user.setProfile(requestMap.get("profile"));
//        user.setStatus("true");
        user.setRole("user");
        return user;
    }
//    private User getUserFromMap(Map<String, String> requestMap, boolean isAdd) {
//        Product product=new Product();
//        if(isAdd){
//            product.setId(Integer.parseInt(requestMap.get("id")));
//        }else product.setStatus("true");
//        product.setName(requestMap.get("name"));
//        product.setDescription(requestMap.get("description"));
//        product.setPrice(Integer.parseInt(requestMap.get("price")));
//        return product;
//
//    }

    @Override
    public ResponseEntity<String> login (Map<String,String> requestMap){
        log.info("Inside login");
        try{

            log.info("himanshuError");
            Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                    (requestMap.get("userName"),requestMap.get("password")));
            if(authentication.isAuthenticated()){
                if(customerUserDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true")){
//                    return  new ResponseEntity<String>("{\"token\":\""+
//                            jwtUtil.generateToken(customerUserDetailsService.getUserDetail().getEmail(),
//                                    customerUserDetailsService.getUserDetail().getRole())+"\"}",HttpStatus.OK);
                    return  new ResponseEntity<String>("{\"token\":\""+
                            jwtUtil.generateToken(customerUserDetailsService.getUserDetail().getEmail(),
                                    customerUserDetailsService.getUserDetail().getRole())+"\",\"role\":\""+customerUserDetailsService.getUserDetail().getRole()+"\"}",HttpStatus.OK);

                }
                else{
                    return new ResponseEntity<String>("{\"message\":\""+"Wait for admin approval"+"\"}",HttpStatus.BAD_REQUEST );
                }
            }
        }catch (Exception exception){
            log.error("{}",exception);
        }
        return new ResponseEntity<String>("{\"message\":\""+"Bad credentials"+"\"}",HttpStatus.BAD_REQUEST);
    }
//    @Override
//    public User createUser(User user, Set<UserRole> userRoles) {
//        return null;
//    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try{
            if(jwtFilter.isAdmin()){
                return new ResponseEntity<>(userRepo.getAllUser(),HttpStatus.OK);
            }else
                return new ResponseEntity<>(userRepo.getByUsername(jwtFilter.getCurrentUser()),HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
               Optional<User> optional = userRepo.findById(Integer.parseInt(requestMap.get("id")));
               if(optional.isPresent()){
                   userRepo.updateStatus(requestMap.get("status"),Integer.parseInt(requestMap.get("id")) );
                   return new ResponseEntity<>("User status updated successfully",HttpStatus.OK);
               }
               else {
                   return new ResponseEntity<>("User id doesn't exist",HttpStatus.OK);
               }
            }else
                return new ResponseEntity<>("Unauthorized access",HttpStatus.UNAUTHORIZED);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
//                if(this.validateUserMap(requestMap,true)){
                if(this.validateSignupMap(requestMap,false)){
                    Optional<User> optional=userRepo.findById(Integer.parseInt(requestMap.get("id")));
                    if(optional.isPresent()){
//                        User userFromMap=this.getUserFromMap(requestMap,true);
                        User userFromMap=this.getUserFromMap(requestMap,true);
                        userFromMap.setStatus(optional.get().getStatus());
                        userRepo.save(userFromMap);
                        return new ResponseEntity<>("User Updated Successfully",HttpStatus.OK) ;

                    }else return new ResponseEntity<>("User with id " + requestMap.get("id") + " does not exists", HttpStatus.NOT_FOUND);
                }else return new ResponseEntity<>("Data is Invalid",HttpStatus.BAD_REQUEST);
            }else return new ResponseEntity<>("Unauthorized Access",HttpStatus.UNAUTHORIZED);

        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteUser(Integer id) {
        try{
            if(jwtFilter.isAdmin()){
                Optional<User> optional=userRepo.findById(id);
                if(optional.isPresent()){
                    userRepo.deleteById(id);
                    return new ResponseEntity<>("User was deleted successfully",HttpStatus.OK);
                }else{
                    return new ResponseEntity<>("User with id:"+id+"does not exist",HttpStatus.NOT_FOUND);
                }
            }else{
                return new ResponseEntity<>("You are not authorized for this action",HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong due to server",HttpStatus.INTERNAL_SERVER_ERROR);
    }



}
