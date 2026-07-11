# AI Development Workflow Comparison

## Overview

This document compares two approaches to AI-assisted development for creating a settings form feature. The first implementation was created using a single vague prompt, while the second implementation was created using a detailed prompt containing file references, requirements, constraints, and a verification process.

## Correctness

The vague prompt implementation produced a basic settings form with limited functionality. It included the main form fields and simple validation, but some expected behaviors were missing. The AI generated a working interface, but it did not fully consider all possible requirements.

The structured prompt implementation produced a more complete solution. The prompt clearly defined validation rules, expected behavior, and file organization. The generated version included stronger validation logic, improved form handling, and clearer separation between HTML, CSS, and JavaScript.

During the branch comparison using `git diff`, one specific improvement was the addition of:

`aria-labelledby="settings-heading"`

to the settings section. This change was not present in the first version and improved the quality of the implementation.

## Accessibility

The structured prompt version showed better accessibility practices because accessibility requirements were included directly in the instructions. The improved version added semantic HTML structure, labels for form inputs, and ARIA attributes to support users who rely on screen readers.

The vague prompt did not provide enough instructions for accessibility, which resulted in missing accessibility considerations. This demonstrated that AI tools often follow the quality of the requirements provided by the developer.

## Edge Cases

The structured workflow considered more edge cases because the prompt specifically requested validation and testing. The implementation handled cases such as empty fields, invalid email formats, password requirements, and mismatched passwords.

During review, one AI mistake was identified: the initial AI-generated form did not include complete accessibility handling in the first implementation. The settings section was missing the `aria-labelledby="settings-heading"` attribute, which was later added in the structured prompt version. Manual review and comparison using `git diff` helped identify this issue and improve the final implementation.

This showed that AI-generated code can miss important requirements unless accessibility, validation rules, and expected behavior are clearly specified in the prompt.

## Review Effort

The vague prompt version required more manual review because the generated output had fewer requirements and assumptions were made by the AI. More time was needed to identify missing features and improve the implementation.

The structured prompt version reduced review effort because the AI had clear instructions and verification steps. However, human review was still necessary because generated code must be tested before being considered reliable.

## Conclusion

This comparison shows that effective AI-assisted development depends on providing detailed specifications, reviewing generated code, and verifying functionality. A well-structured prompt produced a more maintainable, accessible, and reliable implementation compared to a simple vague request.
