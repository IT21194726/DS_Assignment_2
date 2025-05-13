package com.eduhub.userservice.exception;


import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException {

    private static final long serialVersionUID = -5813841768213591498L;

    private final int errorCode;

    private final String errorDescription;

    public ValidationException(int errorCode, Throwable cause, String errorDescription) {
        super(cause);
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }

    public ValidationException(int errorCode, String errorDescription) {
        super(errorDescription);
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }

    public ValidationException(int errorCode, String errorDescription, Throwable cause) {
        super(errorDescription, cause);
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }
}