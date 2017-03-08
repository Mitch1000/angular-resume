(function () {
'use strict';

    module.exports = function () { return Contact; };

    function Contact (
        name,
        email,
        subject,
        content
    ) {
        this.name = name || '';
        this.email = email || '';
        this.subject = subject || '';
        this.content = content || '';

        this.clone = clone;

        /**
         * Creates a deep clone of this object.
         * @memberof Contact 
         * @returns {Contact}
         */
        function clone () {
            return new Contact(
              this.name,
              this.email,
              this.subject,
              this.content
            );
        }
    }

}());
