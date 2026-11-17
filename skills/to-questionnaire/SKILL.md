---
name: to-questionnaire
description: Turn unresolved project decisions or information gaps into a focused questionnaire for a client, colleague, or other domain expert.
---

# To Questionnaire

Prepare questions for the person who holds information the user and agent cannot resolve themselves. Focus the questionnaire on what the recipient needs to answer so the work can proceed.

## Identify the gap and recipient

Read the relevant project sources and settled decisions first. Separate facts the agent can investigate from decisions or knowledge only the recipient can provide. Do not send someone a question already answered by the sources; surface contradictions where they affect the requested decision. For material project choices, use the existing [project decision procedure](../../agents/references/project-decisions.md).

Establish the recipient's role, relevant expertise and relationship to the user, and the concrete facts or decisions needed back. Reuse session context instead of requiring an interview. Ask a concise bundled clarification only when missing recipient context or outcomes would materially change the questions; continue source research independently. Do not ask the user to answer the subject they are seeking the recipient's help with.

Map each unresolved outcome to a question and explain which work or choice its answer affects. Keep confirmed requirements, proposals and open questions distinct. Do not imply that a suggested answer has already been accepted.

## Draft for the recipient

Use the recipient's language and level of knowledge. When writing on the user's behalf, apply the available writing-style skill where relevant. Keep project identifiers and canonical contract names accurate.

Scale the structure to the number and complexity of questions:

- **Purpose and context:** the decision at stake, how the answers will be used, and enough source context for someone outside this conversation.
- **Questions:** most important first, grouped by topic when helpful. Each question asks one thing and provides room to answer. Include alternatives and their consequences where they clarify a decision, without steering the recipient toward an unsupported answer.
- **Answer guidance:** uncertainty and partial answers are useful. Include a deadline, owner or effort estimate only when supplied or supported; do not invent commitments.
- **Remaining context:** invite a correction or missing consideration when useful.

Use a short explanation of why a question matters only where it changes the answer's usefulness. Avoid exhaustive discovery checklists and questions unrelated to the blocked outcome.

## Deliver and handle answers

Return a chat draft for a draft-only request. When saving is requested, reuse the established project document location and format; otherwise use a descriptive Markdown filename in the authorized workspace. Preserve existing user edits. Include source links where the recipient needs them, without exposing private material to an unintended audience.

Report the draft or saved path and the material gaps it covers. Creating a questionnaire does not authorize sending it, publishing tracker records, assigning work, or making the underlying decision. If sending is separately authorized, follow the relevant service workflow and current recipient details.

When answers arrive, reconcile them with the source requirements and existing decisions. Record settled outcomes in their existing owner within authorized documentation scope; identify any remaining contradiction before dependent implementation. A returned questionnaire alone does not prove agreement or implementation.

Adapted from Matt Pocock's `to-questionnaire`; see [provenance](../upstream-sources.json) and [MIT license](../upstream-licenses/mattpocock.txt).
