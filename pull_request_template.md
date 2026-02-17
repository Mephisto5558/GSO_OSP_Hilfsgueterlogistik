## Jira Reference
<!-- Please link the Jira ticket here. Example: [PROJ-123](https://your-jira.atlassian.net/browse/PROJ-123) -->
<!-- If no ticket exists, create one. -->
* Ticket Link: [TICKET-ID]

## Summary of Changes
<!-- What was changed? Why was it changed? (Short description) -->


## Type of Change
<!-- Please check the relevant options (replace [ ] with [x]) -->
- [ ] Bugfix (Non-breaking change which fixes an issue)
- [ ] New Feature (Non-breaking change which adds functionality)
- [ ] Refactoring (Code improvement without changing functionality)
- [ ] Documentation (Update to Readme, comments, etc.)
- [ ] **Breaking Change** (Fix or feature that would cause existing functionality to not work as expected)

## Screenshots / Videos (Optional)
<!-- If UI changes were made, please attach screenshots or videos here -->


## Checklist
<!-- ⚠️ IMPORTANT: PRs without unit tests, with failing tests or failing builds will NOT be accepted! -->
<!-- Please go through this list before requesting a review -->
#### Code & Scope
- [ ] I have performed a self-review of the code and diff.
- [ ] The code adheres to the project's style guidelines (`eslint .` reports no new issues).
- [ ] This PR contains only related changes; unrelated changes are in a separate PR.
- [ ] Unnecessary files (e.g., debug logs, temp files, **dist** directory) have not been committed.
- [ ] All code, comments, documentation, and commit messages are written in English.
- [ ] The code is commented, especially in complex or hard-to-understand areas.
#### Testing & Build
- [ ] Comprehensive unit tests have been added for the changes. (_If applicable_)
- [ ] All unit tests (new and existing) pass locally (`npm run test`).
- [ ] The project builds successfully without errors (`npm run build`).
#### Documentation & Process
- [ ] Relevant documentation has been reviewed and updated.
- [ ] The corresponding Jira ticket has been updated and will be updated again after this PR is merged.

## Testing Instructions
<!-- How can the reviewer test your changes manually? -->
1. Checkout branch...
2. Run command...