# this one is a Complete Deployment

name: Deploy to DigitalOcean

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up SSH
      uses: webfactory/ssh-agent@v0.5.3
      with:
        ssh-private-key: ${{ secrets.YOGA_APP }}

    - name: Build and deploy
      env:
        HOST: ${{ secrets.DO_HOST }}
        USER: ${{ secrets.DO_USER }}
        MONGODB_URI: ${{ secrets.MONGODB_URI }}
        JWT_SECRET_KEY: ${{ secrets.JWT_SECRET_KEY }}
        SENDER_EMAIL_ACCOUNT: ${{ secrets.SENDER_EMAIL_ACCOUNT }}
        APP_PASSWORD: ${{ secrets.APP_PASSWORD }}
      run: |
        echo "Deploying to $HOST"
        scp -o "StrictHostKeyChecking no" -r $GITHUB_WORKSPACE/* $USER@$HOST:/root/
        scp -o "StrictHostKeyChecking no" -r $GITHUB_WORKSPACE/YogaWebApp/dist $USER@$HOST:/var/www/html
        ssh -o "StrictHostKeyChecking no" $USER@$HOST << 'EOF'
          cd /root
          echo "MONGODB_URI=$MONGODB_URI" >> .env
          echo "JWT_SECRET_KEY=$JWT_SECRET_KEY" >> .env
          echo "SENDER_EMAIL_ACCOUNT=$SENDER_EMAIL_ACCOUNT" >> .env
          echo "APP_PASSWORD=$APP_PASSWORD" >> .env
          pm2 restart all || pm2 start index.mjs --name backend
          sudo systemctl restart nginx
        EOF


# Complete Github Action Deployment Of This Application

During the creation of a DigitalOcean droplet and the setup of GitHub Actions, you'll be dealing with SSH keys to ensure secure access and automated deployment. Here's how you manage the SSH keys for both processes:

### SSH Key for Droplet Creation

When you create a droplet on DigitalOcean, you'll need to add an SSH key to the droplet. This allows you to securely connect to your droplet without using passwords.

1. Generate an SSH Key (if you haven't already):
   ```sh
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   This will generate a public and private key pair, typically saved in `~/.ssh/id_rsa` (private key) and `~/.ssh/id_rsa.pub` (public key).

2. Add the SSH Public Key to DigitalOcean:
   - During droplet creation, there's an option to add an SSH key.
   - Copy the contents of your public key (`~/.ssh/id_rsa.pub`) and paste it into the SSH key field in the DigitalOcean dashboard.

### SSH Key for GitHub Actions

For GitHub Actions to deploy to your droplet, you need to use the same SSH key or generate a new one for automation purposes.

1. Add the SSH Private Key to GitHub Secrets:
   - Go to your repository on GitHub.
   - Navigate to `Settings` > `Secrets and variables` > `Actions`.
   - Add a new secret named `DO_SSH_PRIVATE_KEY` and paste the content of your private key (`~/.ssh/id_rsa`).

2. Add Other Secrets:
   - Add the droplet IP as `DO_HOST`.
   - Add the username you use to SSH into the droplet (typically `root` or another user you've created) as `DO_USER`.

### Step 3: GitHub Actions Workflow

Create a GitHub Actions workflow file to automate the deployment process. This file should be created in `.github/workflows/deploy.yml`.

Here is a complete example:

```yaml
name: Deploy to DigitalOcean

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up SSH
      uses: webfactory/ssh-agent@v0.5.3
      with:
        ssh-private-key: ${{ secrets.DO_SSH_PRIVATE_KEY }}

    - name: Deploy to server
      env:
        HOST: ${{ secrets.DO_HOST }}
        USER: ${{ secrets.DO_USER }}
      run: |
        echo "Deploying to $HOST"
        ssh $USER@$HOST << EOF
          # Install necessary packages
          sudo apt-get update
          sudo apt-get install -y nginx nodejs npm

          # Install PM2
          sudo npm install -g pm2

          # Set up firewall
          sudo ufw allow OpenSSH
          sudo ufw allow 'Nginx Full'
          sudo ufw enable

          # Set up project directories
          mkdir -p /var/www/mern-backend
          mkdir -p /var/www/mern-frontend

          # Clone repository
          cd /var/www/mern-backend
          git clone https://github.com/your-username/your-repo.git .

          # Install dependencies and build
          npm install
          npm run build

          # Start backend with PM2
          pm2 restart all || pm2 start index.mjs --name backend

          # Set up Nginx for frontend
          sudo cp -r build/* /var/www/html/
          sudo systemctl restart nginx
        EOF
```

### Step 4: Configure the Droplet

Here’s a more detailed breakdown of the droplet configuration:

1. Update System Packages:
   ```sh
   sudo apt-get update && sudo apt-get upgrade -y
   ```

2. Install Node.js and npm:
   ```sh
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install PM2:
   ```sh
   sudo npm install -g pm2
   ```

4. Install Nginx:
   ```sh
   sudo apt-get install -y nginx
   ```

5. Set Up the Firewall:
   ```sh
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

### Step 5: Set Up Nginx

1. Edit Nginx Configuration:
   ```sh
   sudo nano /etc/nginx/sites-available/default
   ```

2. Update the Configuration:
   Replace the content with the following configuration:

   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;

       # Serve React frontend
       location / {
           root /var/www/html;
           try_files $uri /index.html;
       }

       # Proxy API requests to the backend
       location /api/ {
           proxy_pass http://localhost:5000; # Adjust the port as needed
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Test and Reload Nginx:
   ```sh
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Step 6: Directory Setup on Droplet

1. Create Directories:
   ```sh
   mkdir -p /var/www/mern-backend
   mkdir -p /var/www/mern-frontend
   ```

### Step 7: Security

1. Add User and Disable Root Login:
   - Create a new user:
     ```sh
     adduser your_new_user
     usermod -aG sudo your_new_user
     ```
   - Disable root login by editing the SSH config:
     ```sh
     sudo nano /etc/ssh/sshd_config
     ```
     - Set `PermitRootLogin` to `no`.
     - Restart SSH:
       ```sh
       sudo systemctl restart ssh
       ```

### Step 8: GitHub Actions Workflow Breakdown

1. Checkout Code:
   ```yaml
   - name: Checkout code
     uses: actions/checkout@v2
   ```

2. Set Up SSH:
   ```yaml
   - name: Set up SSH
     uses: webfactory/ssh-agent@v0.5.3
     with:
       ssh-private-key: ${{ secrets.DO_SSH_PRIVATE_KEY }}
   ```

3. Deploy to Server:
   ```yaml
   - name: Deploy to server
     env:
       HOST: ${{ secrets.DO_HOST }}
       USER: ${{ secrets.DO_USER }}
     run: |
       echo "Deploying to $HOST"
       ssh $USER@$HOST << EOF
         # Install necessary packages
         sudo apt-get update
         sudo apt-get install -y nginx nodejs npm

         # Install PM2
         sudo npm install -g pm2

         # Set up firewall
         sudo ufw allow OpenSSH
         sudo ufw allow 'Nginx Full'
         sudo ufw enable

         # Set up project directories
         mkdir -p /var/www/mern-backend
         mkdir -p /var/www/mern-frontend

         # Clone repository
         cd /var/www/mern-backend
         git clone https://github.com/your-username/your-repo.git .

         # Install dependencies and build
         npm install
         npm run build

         # Start backend with PM2
         pm2 restart all || pm2 start index.mjs --name backend

         # Set up Nginx for frontend
         sudo cp -r build/* /var/www/html/
         sudo systemctl restart nginx
       EOF
   ```

### Summary

1. Create and configure a DigitalOcean droplet with SSH access.
2. Set up necessary software (Node.js, npm, PM2, Nginx) and security configurations on the droplet.
3. Configure GitHub Actions to automate deployment with secure SSH keys and environment variables.
4. Ensure proper security by adding a non-root user and configuring the firewall.
5. Set up Nginx to serve your MERN stack application, with specific configurations for frontend and backend.

This approach provides a complete end-to-end solution for deploying a MERN stack application using GitHub Actions and a DigitalOcean droplet.

