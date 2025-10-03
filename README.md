# Testing django 

A Django web application for testing some functionalities.

## Project Structure

This Django project includes:
- **mysite**: Main Django project configuration
- **maps**: Maps application for cycling-related mapping features
- **polls**: Polls application for user interactions (from django tutorial)
- **SQLite database**: Local development database

## Prerequisites

Before setting up this project, make sure you have Python 3.8+ installed on your system.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jmejia8/django-turorial-project.git
```

### 2. Create and Activate Virtual Environment

#### On Linux/macOS:
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate
```

#### On Windows:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

This will install the following packages:
- Django 5.2.6
- asgiref 3.9.2
- sqlparse 0.5.3

### 4. Run Database Migrations

```bash
# Create migration files for apps
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

### 5. Create Superuser (Optional)

To access the Django admin interface:

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin user.

### 6. Run the Development Server

```bash
python manage.py runserver
```

The server will start on `http://127.0.0.1:8000/` by default.

## Available Applications

### Maps App
- URL: `/maps/`
- Features mapping functionality for cycling routes

### Polls App
- URL: `/polls/`
- Features user polling functionality (from tutorial)

### Admin Interface
- URL: `/admin/`
- Django admin interface for managing data

## Development Commands

### Run Tests
```bash
python manage.py test
```

### Collect Static Files (for production)
```bash
python manage.py collectstatic
```

### Create New Migrations
```bash
python manage.py makemigrations <app_name>
```

### Apply Migrations
```bash
python manage.py migrate
```

### Django Shell
```bash
python manage.py shell
```

## Database

This project uses SQLite for local development. The database file is located at `db.sqlite3` in the project root.

## Environment Variables

For production deployment, make sure to:
1. Set `DEBUG = False` in settings.py
2. Generate a new `SECRET_KEY`
3. Configure `ALLOWED_HOSTS` properly
4. Use a production database (PostgreSQL, MySQL, etc.)

## Troubleshooting

### Common Issues

1. **Port already in use**: If port 8000 is busy, run:
   ```bash
   python manage.py runserver 8080
   ```

2. **Migration errors**: If you encounter migration issues:
   ```bash
   python manage.py migrate --fake-initial
   ```

3. **Virtual environment not activating**: Make sure you're in the correct directory and using the right activation command for your operating system.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests to ensure everything works
4. Submit a pull request

## License

[Add your license information here]
