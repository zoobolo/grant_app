# Git Workflow Guidelines

## Branch Structure

```
main                    # Production-ready code
├── develop            # Integration branch for features
    ├── session/*      # Session-based development branches
    ├── feature/*      # Feature branches
    ├── design/*       # Design and UI branches
    └── hotfix/*       # Emergency fixes
```

## Branch Naming Conventions

- `session/XX-description` - Session work (e.g., `session/01-ui-mockups`)
- `feature/component-name` - New features (e.g., `feature/grant-filtering`)
- `design/component-name` - Design work (e.g., `design/status-indicators`)
- `hotfix/issue-description` - Urgent fixes (e.g., `hotfix/grant-save-error`)

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `design`: UI/UX design changes
- `mockup`: New screen mockups
- `feat`: New feature implementation
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code formatting (no logic changes)
- `refactor`: Code restructuring
- `test`: Test additions or changes
- `chore`: Maintenance tasks

### Scopes
- `pipeline`: Pipeline/dashboard view
- `grant-detail`: Grant detail screen
- `new-grant`: New grant creation
- `api`: API endpoints
- `db`: Database changes
- `auth`: Authentication
- `ui`: UI components
- `types`: TypeScript types/interfaces

### Examples
```
mockup(pipeline): add filterable grant table with status indicators

Implemented the main pipeline view with:
- Sortable columns
- Multi-criteria filtering
- Status pill components
- Sticky LOCID column

design(ui): create reusable status pill components

feat(api): add grant CRUD endpoints

fix(grant-detail): correct requirement completion logic

docs: update development plan with Phase 2 progress
```

## Workflow Process

### Starting New Work
1. Ensure you're on latest `develop`
2. Create new branch from `develop`
3. Make atomic commits with clear messages
4. Update documentation as you go

### Completing Work
1. Update session documentation
2. Ensure all tests pass
3. Create pull request to `develop`
4. Archive session notes after merge

### Daily Workflow
```bash
# Start of day
git checkout develop
git pull origin develop
git checkout -b session/XX-description

# During work
git add .
git commit -m "type(scope): description"

# End of session
git push origin session/XX-description
# Create PR if ready for review
```

## Code Review Checklist

### Before Creating PR
- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Atomic commits with clear messages

### PR Description Template
```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Design update
- [ ] Documentation

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Cross-browser tested

## Documentation
- [ ] Updated relevant docs
- [ ] Added inline comments where needed
```

## Merge Strategy

- `feature/* → develop`: Squash and merge
- `session/* → develop`: Preserve commits (regular merge)
- `develop → main`: Create release tag
- `hotfix/* → main`: Cherry-pick to develop after merge

## Version Tags

Format: `vX.Y.Z`
- X: Major version (breaking changes)
- Y: Minor version (new features)
- Z: Patch version (bug fixes)

Example: `v1.2.3`

## Best Practices

1. **Atomic Commits**: Each commit should represent one logical change
2. **Frequent Commits**: Commit early and often
3. **Clear Messages**: Future you will thank present you
4. **Update Docs**: Documentation changes in same commit as code
5. **Clean History**: Rebase feature branches before merging
6. **No Direct Push**: Always work in branches, never push directly to main/develop

## Useful Git Commands

```bash
# View branch graph
git log --graph --oneline --all

# Interactive rebase (clean up commits)
git rebase -i HEAD~3

# Stash changes temporarily
git stash save "WIP: description"

# Cherry-pick specific commit
git cherry-pick <commit-hash>

# Reset to previous commit (keep changes)
git reset --soft HEAD~1

# Amend last commit message
git commit --amend -m "new message"
```

---
*Last Updated: 2025-08-29*