# Contributing to PingMe

Thank you for your interest in contributing to PingMe! We welcome contributions from developers around the world and are excited to have you join our community.

PingMe is a social network platform inspired by X (formerly Twitter) and Threads, built with React/TypeScript frontend and Laravel/PHP backend. This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Contributions](#making-contributions)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Communication Guidelines](#communication-guidelines)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. By participating in this project, you agree to abide by our Code of Conduct:

### Our Standards

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome diverse perspectives and backgrounds
- **Be Professional**: Maintain professional communication in all interactions
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Remember that everyone has different experience levels

### Unacceptable Behavior

- Harassment, discrimination, or offensive language
- Personal attacks or trolling
- Spam or irrelevant content
- Sharing private information without consent
- Any behavior that would be inappropriate in a professional setting

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PHP](https://www.php.net/) (v8.1+ for local development)
- [Composer](https://getcomposer.org/) (for PHP dependency management)

### Project Structure

```
pingme/
├── frontend/          # React/TypeScript frontend
├── backend/           # Laravel/PHP backend
├── docker-compose.yml # Docker configuration
├── README.md          # Project overview
├── CONTRIBUTING.md    # This file
└── LICENSE           # MIT License
```

## Development Setup

### Quick Start with Docker

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/pingme.git
   cd pingme
   ```

2. **Start the Development Environment**
   ```bash
   docker-compose up -d
   ```

3. **Access the Application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8000](http://localhost:8000)

### Local Development Setup

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

### Environment Configuration

- Copy `backend/.env.example` to `backend/.env`
- Configure database and other environment variables as needed
- The Docker setup handles most configuration automatically

## Making Contributions

### Types of Contributions

We welcome various types of contributions:

- **Bug Fixes**: Fix issues and improve stability
- **Features**: Add new functionality
- **Documentation**: Improve README, comments, or guides
- **Testing**: Add or improve tests
- **Performance**: Optimize code performance
- **UI/UX**: Improve user interface and experience

### Before You Start

1. **Check Existing Issues**: Look for existing issues related to your contribution
2. **Create an Issue**: If none exists, create a new issue to discuss your proposal
3. **Get Feedback**: Wait for maintainer feedback before starting large changes
4. **Claim the Issue**: Comment on the issue to let others know you're working on it

## Pull Request Process

### 1. Prepare Your Changes

```bash
# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name

# Make your changes and commit them
git add .
git commit -m "Add: brief description of changes"

# Push to your fork
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your branch and provide a clear title and description
4. Fill out the pull request template (if available)

### 3. Pull Request Requirements

Your pull request should:

- **Have a Clear Title**: Describe what the PR does
- **Include Description**: Explain the changes and why they're needed
- **Reference Issues**: Link to related issues using `#issue-number`
- **Pass All Checks**: Ensure all CI/CD checks pass
- **Be Up-to-Date**: Rebase against the latest main branch if needed

### 4. Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Related Issues
Closes #issue-number
```

### 5. Review Process

- Maintainers will review your PR within 48-72 hours
- Address any feedback promptly and professionally
- Be prepared to make changes based on review comments
- Once approved, maintainers will merge your PR

## Code Style Guidelines

### Frontend (React/TypeScript)

- **ESLint**: Follow the ESLint configuration in the project
- **Prettier**: Use Prettier for consistent formatting
- **TypeScript**: Use strict TypeScript types, avoid `any`
- **Components**: Use functional components with hooks
- **Naming**: Use PascalCase for components, camelCase for functions

```bash
# Run linter
npm run lint

# Build the project
npm run build
```

### Backend (Laravel/PHP)

- **PHP Standards**: Follow PSR-12 coding standards
- **Laravel Conventions**: Use Laravel best practices
- **Pint**: Use Laravel Pint for code formatting
- **Naming**: Follow Laravel naming conventions

```bash
# Format code with Pint
./vendor/bin/pint

# Run tests
php artisan test
```

### General Guidelines

- **Comments**: Write clear, helpful comments for complex logic
- **Commits**: Use conventional commit messages
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update relevant documentation

### Commit Message Format

```
type: brief description

Optional longer description explaining the change.

Closes #issue-number
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

## Communication Guidelines

### Language

- **Primary Language**: English for all contributions
- **Be Clear**: Use simple, clear English
- **Be Concise**: Keep messages focused and to the point
- **Be Professional**: Maintain professional tone

### Where to Communicate

- **Issues**: For bug reports and feature requests
- **Pull Requests**: For code review discussions
- **Discussions**: For general questions and ideas (if enabled)

### Response Times

- **Issues**: We aim to respond within 48 hours
- **Pull Requests**: Initial review within 72 hours
- **Complex Reviews**: May take up to 1 week for thorough review

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear Title**: Describe the issue concisely
2. **Environment**: Operating system, browser, versions
3. **Steps to Reproduce**: Detailed steps to recreate the issue
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Screenshots**: If applicable
7. **Console Logs**: Any error messages or console output

### Feature Requests

For new features, please include:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How should this be implemented?
3. **Alternatives**: Any alternative solutions considered?
4. **Use Cases**: Who would benefit from this feature?

### Security Issues

For security-related issues:

- **Do not** create public issues for security vulnerabilities
- Contact maintainers directly via email or private message
- Provide detailed information about the vulnerability
- Allow reasonable time for fix before public disclosure

## Getting Help

If you need help or have questions:

1. **Check Documentation**: Review README and existing issues
2. **Search Issues**: Someone might have asked the same question
3. **Create an Issue**: For bugs or feature requests
4. **Be Specific**: Provide context and details in your questions

## Recognition

We value all contributions to PingMe:

- Contributors will be recognized in our documentation
- Significant contributions may be highlighted in release notes
- We maintain a contributors list in our project

## Development Tips

### Debugging

- Use browser developer tools for frontend debugging
- Use Laravel debugbar or Telescope for backend debugging
- Check Docker logs: `docker-compose logs [service-name]`

### Testing

- Write unit tests for new functionality
- Test your changes in multiple browsers
- Verify responsive design on different screen sizes
- Test both frontend and backend integration

### Performance

- Optimize images and assets
- Use efficient database queries
- Follow React performance best practices
- Monitor bundle size and loading times

## License

By contributing to PingMe, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PingMe! Together, we're building a better social networking experience for everyone. 🚀