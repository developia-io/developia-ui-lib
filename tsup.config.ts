import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./index.ts"],
	format: ["cjs","esm"],
	external: ["@developia.io/developia-ui-lib"],
	dts: true, // Generate .d.ts files
	minify: true, // Minify output
	// sourcemap: true, // Generate sourcemaps
	treeshake: true, // Remove unused code
	clean: true, // Clean output directory before building
	outDir: "dist", // Output directory
	inject: ["./react.import.js"],
});
