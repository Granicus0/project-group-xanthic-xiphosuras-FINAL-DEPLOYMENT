import React from 'react'
import {
    ChakraProvider,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
  } from '@chakra-ui/react'

const EmptyDataAlert = ({Button_info}) => {
    return (
        <ChakraProvider >
            <AlertDialog 
                isOpen={Button_info.isOpen}
                onClose={Button_info.onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            No Data Found
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Please upload a file first!
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={Button_info.onClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </ChakraProvider>
    )
}

export default EmptyDataAlert