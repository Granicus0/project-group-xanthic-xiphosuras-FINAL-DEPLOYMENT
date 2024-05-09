// Import React and necessary components from Chakra UI
import React from 'react'
import {
    ChakraProvider,  // Provides Chakra UI theme context to its children
    AlertDialog,  // Component to display modal dialogs
    AlertDialogBody,  // Container for the body content of the dialog
    AlertDialogFooter,  // Container for the footer content of the dialog
    AlertDialogHeader,  // Container for the header content of the dialog
    AlertDialogContent,  // Wrapper that contains the dialog's content
    AlertDialogOverlay,  // Overlay component that darkens the background when dialog is open
    AlertDialogCloseButton,  // A button component that provides a close action for the dialog
    Button,  // Button component for UI actions
  } from '@chakra-ui/react'

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Define a React functional component `EmptyDataAlert` that takes `Button_info` as a prop
const ProcessErroralert = ({Button_info, process }) => {
    return (
        // ChakraProvider component to enable Chakra UI styling within the AlertDialog
        <ChakraProvider>
            {/* AlertDialog component to show a modal dialog based on the `isOpen` state */}
            <AlertDialog 
                isOpen={Button_info.isOpen}  // Controls if the dialog is open based on the `isOpen` boolean
                onClose={Button_info.onClose}  // Handler function to close the dialog
                isCentered  // Centers the dialog vertically and horizontally in the viewport
            >
                {/* Overlay component that covers the viewport when dialog is open */}
                <AlertDialogOverlay>
                    {/* Content container for the dialog */}
                    <AlertDialogContent>
                        {/* Header of the dialog with custom font settings */}
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Encounter Error During {capitalizeFirstLetter(process)} Process
                        </AlertDialogHeader>
                        {/* Close button in the header */}
                        <AlertDialogCloseButton />
                        {/* Body of the dialog containing a message */}
                        <AlertDialogBody>
                            We are sorry that we have encountered error during your {process} process.
                            We will redirect you back to your user page on closing this alert.
                        </AlertDialogBody>
                        {/* Footer of the dialog containing a close button */}
                        <AlertDialogFooter>
                            {/* Button that triggers the `onClose` function when clicked */}
                            <Button colorScheme='yellow' onClick={Button_info.onClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </ChakraProvider>
    )
}

// Export the `ProcessErroralert` component for use in other parts of the application
export default ProcessErroralert
