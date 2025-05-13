import { cleanInput } from "./clean_input";
import { describe, expect, test } from "vitest";
describe.each([
    {
        input: "  hello   world  ",
        expected: ["hello", "world"],
    },
    {
        input: "    this is a test    ",
        expected: ["this", "is", "a", "test"]
    }
    // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        let actual = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
