import * as TE from 'fp-ts/TaskEither';
import { Environment } from '@hoppscotch/data';

/**
 * The response object structure exposed to the test script
 */
declare type TestResponse$1 = {
    /** Status Code of the response */
    status: number;
    /** List of headers returned */
    headers: {
        key: string;
        value: string;
    }[];
    /**
     * Body of the response, this will be the JSON object if it is a JSON content type, else body string
     */
    body: string | object;
};
/**
 * The result of an expectation statement
 */
declare type ExpectResult = {
    status: "pass" | "fail" | "error";
    message: string;
};
/**
 * An object defining the result of the execution of a
 * test block
 */
declare type TestDescriptor$1 = {
    /**
     * The name of the test block
     */
    descriptor: string;
    /**
     * Expectation results of the test block
     */
    expectResults: ExpectResult[];
    /**
     * Children test blocks (test blocks inside the test block)
     */
    children: TestDescriptor$1[];
};
/**
 * Defines the result of a test script execution
 */
declare type TestResult = {
    tests: TestDescriptor$1[];
    envs: {
        global: Environment["variables"];
        selected: Environment["variables"];
    };
};
declare const execTestScript: (testScript: string, envs: TestResult["envs"], response: TestResponse$1) => TE.TaskEither<string, TestResult>;

declare type TestResponse = TestResponse$1;
declare type TestDescriptor = TestDescriptor$1;
declare type SandboxTestResult = TestResult & {
    tests: TestDescriptor;
};
/**
 * Executes a given test script on the test-runner sandbox
 * @param testScript The string of the script to run
 * @returns A TaskEither with an error message or a TestDescriptor with the final status
 */
declare const runTestScript: (testScript: string, envs: TestResult["envs"], response: TestResponse) => TE.TaskEither<string, SandboxTestResult>;
/**
 * Executes a given pre-request script on the sandbox
 * @param preRequestScript The script to run
 * @param env The environment variables active
 * @returns A TaskEither with an error message or an array of the final environments with the all the script values applied
 */
declare const runPreRequestScript: (preRequestScript: string, envs: {
    global: {
        key: string;
        value: string;
    }[];
    selected: {
        key: string;
        value: string;
    }[];
}) => TE.TaskEither<string, {
    global: {
        key: string;
        value: string;
    }[];
    selected: {
        key: string;
        value: string;
    }[];
}>;

export { SandboxTestResult, TestDescriptor, TestResponse, TestResult, execTestScript, runPreRequestScript, runTestScript };
