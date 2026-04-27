CREATE TABLE
    user_accounts (
        user_id UUID PRIMARY KEY DEFAULT uuidv7 (),
        role_id INT NOT NULL REFERENCES role_types (type_id),
        hash_algorithm_id INT NOT NULL REFERENCES hash_algorithm_types (type_id),
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(254) NOT NULL UNIQUE,
        password_hash VARCHAR(128) NOT NULL,
        password_salt VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        email_verified BOOLEAN DEFAULT FALSE,
        created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE CURRENT_TIMESTAMP,
        deactivated_at       TIMESTAMP NULL,
        activated_at         TIMESTAMP NULL
    );

CREATE TABLE
    user_profiles (
        user_id UUID NOT NULL REFERENCES user_accounts (user_id),
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        gender VARCHAR(20) NULL,
        date_of_birth DATE NULL,
        phone_number VARCHAR(50) NULL,
        address_line VARCHAR(100) NULL,
        city VARCHAR(100) NULL,
        region VARCHAR(50) NULL,
        postal_code VARCHAR(20) NULL,
        country VARCHAR(50) NULL,
        avatar_url VARCHAR(255) NULL
    );