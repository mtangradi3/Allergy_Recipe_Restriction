package com.javaenthusiast.config;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SSHTunnelConfiguration {


    @PostConstruct
    public void establishSshTunnel() {
        String user = "ubuntu";
        String host = "3.88.207.188";
        int port = 22;
        String privateKey = "src/main/resources/SP_Strate_Group1_Fall2023.pem";

        try {
            JSch jsch = new JSch();
            jsch.addIdentity(privateKey);

            Session session = jsch.getSession("ubuntu", "3.88.207.188", 22);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            int assigned_port = session.setPortForwardingL(3309, "localhost", 3306);
            System.setProperty("local.tunnel.port", String.valueOf(assigned_port));
        } catch (Exception e) {
            throw new IllegalStateException("Failed to establish SSH tunnel", e);
        }
    }
}
