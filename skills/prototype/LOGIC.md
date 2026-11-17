# Logic and State Prototypes

Use this route to explore whether a state model, transition rule or data shape expresses the intended behavior. State the question and distinguish confirmed rules from assumptions before building.

## Make the model observable

Keep the logic separate from its presentation where that makes the model easier to inspect. Choose the existing natural shape: a reducer, explicit state machine, functions over a data structure, or a stateful module. Do not introduce a new abstraction just to match a prototype pattern or duplicate authoritative production logic without explaining the difference.

Expose the relevant current state through readable domain fields and show what an action changes. Make allowed and unavailable actions understandable. Include a reset to a known state when repeated exploration needs one.

Where useful, combine free exploration with short guided walkthroughs of the happy path and the ambiguous transition or edge case. These are controls for the user to explore, not an automatically executed regression suite. Derive examples from the actual question; invented scenarios remain exploratory rather than accepted requirements.

## Choose a portable form

An in-chat visualization can be enough for a local discussion. A self-contained HTML file with inline assets is useful when the user needs a portable demo that opens without installing anything. Use the project's existing runtime when fidelity to its actual behavior matters more than portability, and state which dependencies are real or simulated. Follow the installed modern web guidance before implementing HTML, CSS or client-side JavaScript.

Keep data in memory unless persistence is specifically authorized. Show the model's assumptions and unsupported cases in the demo. A client-side simulation of validation or access rules does not establish how the owning backend behaves.

After exploration, report which scenario exposed or resolved the uncertainty and which decisions the user accepted. Preserve the artifact while it is needed for review. Reusing any logic in production requires the normal implementation and verification scope in [SKILL.md](SKILL.md).
