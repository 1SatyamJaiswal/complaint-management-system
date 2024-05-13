# Resolvio - Blockchain Based Complaint Management System

Resolvio is a blockchain-based complaint management system designed to streamline the process of handling complaints efficiently and transparently. Leveraging blockchain technology ensures the integrity and security of complaint records while providing transparency to all stakeholders.

## Features
- **Blockchain Integration:** Utilizes blockchain technology for secure and immutable complaint records.
- **Efficient Complaint Handling:** Streamlines the process of submitting, processing, and resolving complaints.
- **Transparency:** Provides transparency to all stakeholders by maintaining a public ledger of complaints.
- **User-Friendly Interface:** Offers an intuitive user interface for easy navigation and complaint submission.

## Running the Project
To run Resolvio locally, make sure you have Docker and Docker Compose installed on your system. Then, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/1SatyamJaiswal/complaint-management-system.git
    ```

2. Navigate to the project directory:
    ```
    cd resolvio
    ```

3. Create a `docker-compose.yml` file with the following content:
    ```yaml
    version: '3.8'
    services:
      ganache:
        image: trufflesuite/ganache-cli:latest
        ports:
          - "8545:8545"
        build: 
          context: .
          dockerfile: Dockerfile.ganache
      server:
        build: ./server
        ports:
          - "5000:5000"
        depends_on: 
          - ganache
      web:
        build: ./client
        ports:
          - "3000:3000"
        depends_on:
          - server
    ```

4. Run Docker Compose to start the services:
    ```
    docker-compose up
    ```

5. Access Resolvio in your web browser at `http://localhost:3000`.

## Screenshots
![Screenshot 2024-05-08 194054](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/1d69a6c6-5d4b-4c74-bf1b-e1b36e08264f)
![Screenshot 2024-05-08 194230](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/4bc240a3-d744-4659-bbc5-ab7946287cf7)
![Screenshot 2024-05-08 194356](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/7bcaf27e-67fa-4fe2-97b6-29530785d8d2)
![Screenshot 2024-05-08 195035](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/5c8f0964-3b81-43c1-9473-ddbb42976e17)
![Screenshot 2024-05-08 195014](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/ba27a106-3713-4de8-a36b-898f4dbff296)
![Screenshot 2024-05-08 194832](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/1ae2e696-3b58-4d0a-a2c1-3ad7542d1649)
![Screenshot 2024-05-08 194807](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/35d22e5f-7779-49bd-bdf3-6150fc582f71)
![Screenshot 2024-05-08 195126](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/e0eb7aed-41ab-49fe-9490-e9df134664e7)
![Screenshot 2024-05-08 195414](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/553b8246-c062-4c76-8ee4-300af881d034)
![Screenshot 2024-05-08 195318](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/f8fb56ea-efbe-43db-9b0c-12e22d9e15ad)
![Screenshot 2024-05-08 195239](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/bc16aa9e-ad94-4594-ad33-581c9ffce2a3)
![Screenshot 2024-05-08 195149](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/35616847-5fc6-4599-9b3b-df8ae952adf9)
![Screenshot 2024-05-08 195131](https://github.com/1SatyamJaiswal/complaint-management-system/assets/76004625/bd86efcd-5990-4d2b-aad5-643db371ee0f)


## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

For more information, please contact [Satyam Jaiswal](mailto:satyamjaiswal9752@gmail.com).
