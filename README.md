# Bootstrap Modal Wizrad

> We love open-source so we open source one of our packages 🎉.

It's a `Bootstrap` plugin to create modal with multisteps like installing wizard.

<p align="center"><a href="https://routekick.github.io/bootstrap-modal-wizard/" target="_blank" rel="noopener noreferrer"><img  src="https://user-images.githubusercontent.com/17254073/55558124-0fe22a80-56f4-11e9-83c6-8b4c5c653aed.gif" alt="Bootstrap Modal Wizrad demo"></a></p>

## Install

+ Copy the cdn URL for `.min.js` file and insert them into your html file

    ```html
    <!-- Don't forget to add it after jQuery and Bootstrap -->
    <script src="https://cdn.jsdelivr.net/gh/routekick/bootstrap-modal-wizard@1.0.0/dist/jquery.modal-wizard.min.js"></script>
    ```

## Usage

1. Include [Bootstrap] and [jQuery] into the header of your html file:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
    ```

2. Adding to the DOM:
    + It's just a normal [Boostrap Modal](https://getbootstrap.com/docs/4.3/components/modal/) and all the Modal's rules apply to it like event and styles
    + There are three attributes you should be aware of

        + `data-current-step` `/requried/` defined in the main modal element used to set the current and the default step

            ```html
            <div class="modal" id="mod" data-current-step="1">
            ```

        + `data-step` `/requried/` defined in the every step element inside the modal used to set the step number

            ```html
            <div class="modal" id="mod" data-current-step="1">
                ...
                ...
                    <fieldset data-step="1">
                        ...
                    </fieldset>
                    <fieldset data-step="2">
                        ...
                    </fieldset>
                ...
                ...
            </div>
            ```

        + `data-step-to` accepts `/prev/` `/next/` defined in the control elements to step next and previous between steps

            ```html
                    </fieldset>
                ...
                <div>
                    <button class="btn" data-step-to="prev">
                        Previous
                    </button>
                    <button class="btn" data-step-to="next">
                        Next
                    </button>
                    <button class="btn">
                        Submit
                    </button>
                </div>
                ...
            </div>
            ```

3. When the DOM is ready call the plugin:

    ```JavaScript
    $("#mod").modalWizard();
    ```
