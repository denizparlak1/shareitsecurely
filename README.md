<p align="center">
  <img src="https://storage.googleapis.com/safeshare-publicimages/b0a347b1d5ba42d48f9b03fbb71556ab.png" alt="SafeShare Logo">
</p>


# A Secure File Sharing Solution

SafeShare is a cutting-edge file sharing application designed with security at its core. In today's digital age, ensuring the safety of files and data is paramount. SafeShare addresses this concern by providing a platform where users can share files with confidence. Before any file is shared, it undergoes a rigorous virus scan to ensure it's free from any malicious content. With SafeShare, you can rest assured that every file you share or receive is safe and secure.

Whether you're sharing personal photos, important documents, or any other type of file, SafeShare ensures that your data remains uncompromised. Experience the peace of mind that comes with secure file sharing.

Project built with NestJS. This project leverages technologies like MySQL, Elasticsearch, Google Cloud Storage (GCS), and Postmark to provide secure file sharing and user management functionalities.

## Features

- User registration and session management.
- GCS integration for file uploads.
- Log searching with Elasticsearch.
- Email notifications with Postmark.

## Getting Started

### Prerequisites

- Installed Node.js and npm.
- Running instance of MySQL database.
- Running instance of Elasticsearch.
- Created bucket for Google Cloud Storage.
- An account on Postmark.

# Database Schema

## Tables

### 1. `user`

This table stores information about registered users.

| Column     | Type        | Description                       |
|------------|-------------|-----------------------------------|
| id         | INT         | Primary key for the user.         |
| email      | VARCHAR(255)| Email address of the user.        |
| password   | VARCHAR(255)| Encrypted password of the user.   |
| is_active  | TINYINT     | Indicates if the user is active.  |

---

### 2. `uploads`

This table keeps track of all public file uploads.

| Column             | Type        | Description                                 |
|--------------------|-------------|---------------------------------------------|
| id                 | INT         | Primary key for the upload.                 |
| url                | VARCHAR(255)| URL where the uploaded file can be accessed.|
| email              | VARCHAR(255)| Email of the user who uploaded the file.   |
| original_file_name | VARCHAR(255)| Original name of the uploaded file.         |

---

### 3. `private_uploads`

This table stores information about files that are uploaded privately.

| Column             | Type        | Description                                       |
|--------------------|-------------|---------------------------------------------------|
| id                 | INT         | Primary key for the private upload.               |
| url                | VARCHAR(255)| URL where the private file can be accessed.       |
| email              | VARCHAR(255)| Email of the user who uploaded the file privately.|
| original_file_name | VARCHAR(255)| Original name of the uploaded file.               |
| ttl                | INT         | Time-to-live for the private file.                |
| user_id            | INT         | Foreign key referencing the user table.           |
| size               | INT         | Size of the uploaded file in bytes.               |
| is_deleted         | TINYINT     | Indicates if the file has been deleted.           |
| uploaded_file_name | TEXT        | Name of the file after being uploaded.            |

---

### 4. `password_resets`

This table manages password reset requests.

| Column       | Type        | Description                                  |
|--------------|-------------|----------------------------------------------|
| id           | INT         | Primary key for the password reset request.  |
| user_id      | INT         | Foreign key referencing the user table.      |
| token        | VARCHAR(255)| Token used for the password reset process.   |
| created_at   | TIMESTAMP   | Timestamp when the reset request was created.|
| completed_at | TIMESTAMP   | Timestamp when the reset was completed.      |

---



### Installation

1. Clone the project:
   ```bash
   git clone [repo-link]
   cd shareitsecurely

2. Install dependencies:
   ```bash
   npm install
3. Create a .env file and set the following variables:
   ```bash
   DATABASE_USER='your_mysql_username'
   DATABASE_PASSWORD='your_mysql_password'
   DATABASE_NAME='your_database_name'
   DATABASE_PORT=your_mysql_port
   DATABASE_HOST='your_mysql_host'
   
   ELASTICSEARCH_URL='your_elasticsearch_url'
   ELASTICSEARCH_USERNAME='your_elasticsearch_username'
   ELASTICSEARCH_PASSWORD='your_elasticsearch_password'
   
   GCS_BUCKET_NAME='your_gcs_bucket_name'
   GCS_KEY_FILENAME='path_to_your_gcs_keyfile'
   
   POSTMARK_SERVER_TOKEN='your_postmark_server_token'
   SHARE_LINK_TEMPLATE_ID='your_template_id'
   INFO_MAIL_TEMPLATE_ID='your_template_id'
   PASSWORD_RESET_TEMPLATE_ID='your_template_id'
   
   JWT_SECRET='your_jwt_secret'

4. Start the application:
   ```bash
   npm run start

## API Documentation Setup

To set up API documentation for your NestJS application, follow the steps below:

1. **Install necessary packages**:
   First, you need to install the `@nestjs/swagger` and `swagger-ui-express` packages. If your application uses Fastify, you should install `fastify-swagger` instead.
   ```bash
   npm install --save @nestjs/swagger swagger-ui-express
   ```

2. **Set up Swagger in your `main.ts`**:
   Add the following code to your `main.ts` file to set up the Swagger documentation.
   ```typescript
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

   // ... other imports ...

   const options = new DocumentBuilder()
     .setTitle('Iluvcoffee')
     .setDescription('Coffee application')
     .setVersion('1.0')
     .build();

   const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('api', app, document);
   ```

3. **View the API Documentation**:
   Once your application is running (use `npm run start:dev` if it's not), you can view the Swagger UI at:
   [http://localhost:3000/api](http://localhost:3000/api)

## Contributing

If you'd like to contribute to SafeShare, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support and Contact

Feel free to reach out to us at [support@safeshare.net](mailto:support@safeshare.com) if you have any questions or need support.


---

🌟 **Support Me!** 🌟

If you find this project helpful and want to show some love, consider buying me a coffee! Every bit of support is a huge motivation to keep the project alive and kicking. Thank you!

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Donate-yellow.svg)](https://www.buymeacoffee.com/denizparlak)

---
