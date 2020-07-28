beforeAll(() => {});
beforeEach(() => {});
afterEach(() => {});
afterAll(() => {});

test("Library is empty at the beginning", () => {
	const croux = require("crouxjs");
	expect(Object.keys(croux.library)).toHaveLength(0);
});

test("Add one command to the library when calling croux.use([...]) once", () => {
	const croux = require("crouxjs");
	croux.use("test", () => {});
	expect(Object.keys(croux.library)).toHaveLength(1);
});

test("Added command can be accessed in the library when using croux.use([...])", () => {
	const croux = require("crouxjs");
	croux.use("test", () => {});
	expect(croux.library).toHaveProperty("test");
});

test("use([...]) given callback can be executed", () => {
	const croux = require("crouxjs");
	croux.use("test", () => {
		return "Hello";
	});
	expect(croux.library).toHaveProperty("test");
	const result = croux.library["test"]();
	expect(result).toBe("Hello");
});
