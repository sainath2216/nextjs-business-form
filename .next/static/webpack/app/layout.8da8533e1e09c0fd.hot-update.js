"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"4b3ba219eae5\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlFQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJEOlxcd29ya2ZvbGRlclxcQnVzaW5lc3MgUGFydG5lclxcc3JjXFxhcHBcXGdsb2JhbHMuY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiNGIzYmEyMTllYWU1XCJcbmlmIChtb2R1bGUuaG90KSB7IG1vZHVsZS5ob3QuYWNjZXB0KCkgfVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/components/layout/form-header.tsx":
/*!***********************************************!*\
  !*** ./src/components/layout/form-header.tsx ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FormHeader: () => (/* binding */ FormHeader)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/constants */ \"(app-pages-browser)/./src/lib/constants.ts\");\n/* harmony import */ var _store_formStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/formStore */ \"(app-pages-browser)/./src/store/formStore.ts\");\n/* harmony import */ var _components_ui_progress_steps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/progress-steps */ \"(app-pages-browser)/./src/components/ui/progress-steps.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _logo_neospark_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../logo/neospark.jpg */ \"(app-pages-browser)/./src/components/logo/neospark.jpg\");\n/* __next_internal_client_entry_do_not_use__ FormHeader auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction FormHeader() {\n    _s();\n    const { currentStep } = (0,_store_formStore__WEBPACK_IMPORTED_MODULE_3__.useFormStore)();\n    const stepsWithStatus = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)({\n        \"FormHeader.useMemo[stepsWithStatus]\": ()=>{\n            return _lib_constants__WEBPACK_IMPORTED_MODULE_2__.formSteps.map({\n                \"FormHeader.useMemo[stepsWithStatus]\": (step, index)=>({\n                        ...step,\n                        status: index < currentStep ? \"complete\" : index === currentStep ? \"current\" : \"upcoming\"\n                    })\n            }[\"FormHeader.useMemo[stepsWithStatus]\"]);\n        }\n    }[\"FormHeader.useMemo[stepsWithStatus]\"], [\n        currentStep\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"space-y-6 text-white\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col md:flex-row items-center md:justify-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"w-24 h-auto md:w-32\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                            src: _logo_neospark_jpg__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n                            alt: \"company-logo\",\n                            width: 96,\n                            height: 96,\n                            priority: true\n                        }, void 0, false, {\n                            fileName: \"D:\\\\workfolder\\\\Business Partner\\\\src\\\\components\\\\layout\\\\form-header.tsx\",\n                            lineNumber: 30,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workfolder\\\\Business Partner\\\\src\\\\components\\\\layout\\\\form-header.tsx\",\n                        lineNumber: 29,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-2xl font-semibold\",\n                        children: \"Business Partner Registration Form\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workfolder\\\\Business Partner\\\\src\\\\components\\\\layout\\\\form-header.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\workfolder\\\\Business Partner\\\\src\\\\components\\\\layout\\\\form-header.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_progress_steps__WEBPACK_IMPORTED_MODULE_4__.ProgressSteps, {\n                steps: stepsWithStatus,\n                currentStep: currentStep\n            }, void 0, false, {\n                fileName: \"D:\\\\workfolder\\\\Business Partner\\\\src\\\\components\\\\layout\\\\form-header.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\workfolder\\\\Business Partner\\\\src\\\\components\\\\layout\\\\form-header.tsx\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, this);\n}\n_s(FormHeader, \"7a1/2rYWD9zIujajshuCAFNnWNs=\", false, function() {\n    return [\n        _store_formStore__WEBPACK_IMPORTED_MODULE_3__.useFormStore\n    ];\n});\n_c = FormHeader;\nvar _c;\n$RefreshReg$(_c, \"FormHeader\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2xheW91dC9mb3JtLWhlYWRlci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDK0I7QUFDYTtBQUNLO0FBQ2M7QUFDL0I7QUFDUTtBQUlqQyxTQUFTTTs7SUFDZCxNQUFNLEVBQUVDLFdBQVcsRUFBRSxHQUFHTCw4REFBWUE7SUFFcEMsTUFBTU0sa0JBQWtCSiw4Q0FBT0E7K0NBQUM7WUFDOUIsT0FBT0gscURBQVNBLENBQUNRLEdBQUc7dURBQUMsQ0FBQ0MsTUFBTUMsUUFBVzt3QkFDckMsR0FBR0QsSUFBSTt3QkFDUEUsUUFDRUQsUUFBUUosY0FDSCxhQUNESSxVQUFVSixjQUNULFlBQ0E7b0JBQ1Q7O1FBQ0Y7OENBQUc7UUFBQ0E7S0FBWTtJQUVoQixxQkFDRSw4REFBQ007UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNEO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ0Q7d0JBQUlDLFdBQVU7a0NBQ2IsNEVBQUNkLGtEQUFLQTs0QkFDSmUsS0FBS1YsMERBQUlBOzRCQUNUVyxLQUFJOzRCQUNKQyxPQUFPOzRCQUNQQyxRQUFROzRCQUNSQyxRQUFROzs7Ozs7Ozs7OztrQ0FHWiw4REFBQ0M7d0JBQUdOLFdBQVU7a0NBQXlCOzs7Ozs7Ozs7Ozs7MEJBSXpDLDhEQUFDWCx3RUFBYUE7Z0JBQUNrQixPQUFPYjtnQkFBaUJELGFBQWFBOzs7Ozs7Ozs7Ozs7QUFHMUQ7R0FsQ2dCRDs7UUFDVUosMERBQVlBOzs7S0FEdEJJIiwic291cmNlcyI6WyJEOlxcd29ya2ZvbGRlclxcQnVzaW5lc3MgUGFydG5lclxcc3JjXFxjb21wb25lbnRzXFxsYXlvdXRcXGZvcm0taGVhZGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCB7IGZvcm1TdGVwcyB9IGZyb20gXCJAL2xpYi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgdXNlRm9ybVN0b3JlIH0gZnJvbSBcIkAvc3RvcmUvZm9ybVN0b3JlXCI7XHJcbmltcG9ydCB7IFByb2dyZXNzU3RlcHMgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3Byb2dyZXNzLXN0ZXBzXCI7XHJcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGxvZ28gZnJvbSBcIi4uL2xvZ28vbmVvc3BhcmsuanBnXCI7XHJcblxyXG50eXBlIFN0ZXBTdGF0dXMgPSBcImNvbXBsZXRlXCIgfCBcImN1cnJlbnRcIiB8IFwidXBjb21pbmdcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGb3JtSGVhZGVyKCkge1xyXG4gIGNvbnN0IHsgY3VycmVudFN0ZXAgfSA9IHVzZUZvcm1TdG9yZSgpO1xyXG5cclxuICBjb25zdCBzdGVwc1dpdGhTdGF0dXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBmb3JtU3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKHtcclxuICAgICAgLi4uc3RlcCxcclxuICAgICAgc3RhdHVzOlxyXG4gICAgICAgIGluZGV4IDwgY3VycmVudFN0ZXBcclxuICAgICAgICAgID8gKFwiY29tcGxldGVcIiBhcyBTdGVwU3RhdHVzKVxyXG4gICAgICAgICAgOiBpbmRleCA9PT0gY3VycmVudFN0ZXBcclxuICAgICAgICAgID8gKFwiY3VycmVudFwiIGFzIFN0ZXBTdGF0dXMpXHJcbiAgICAgICAgICA6IChcInVwY29taW5nXCIgYXMgU3RlcFN0YXR1cyksXHJcbiAgICB9KSk7XHJcbiAgfSwgW2N1cnJlbnRTdGVwXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiB0ZXh0LXdoaXRlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1jZW50ZXIgbWQ6anVzdGlmeS1jZW50ZXIgdGV4dC1jZW50ZXIgbWQ6dGV4dC1sZWZ0IHNwYWNlLXktNCBtZDpzcGFjZS15LTAgbWQ6c3BhY2UteC00XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTI0IGgtYXV0byBtZDp3LTMyXCI+XHJcbiAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgc3JjPXtsb2dvfVxyXG4gICAgICAgICAgICBhbHQ9XCJjb21wYW55LWxvZ29cIlxyXG4gICAgICAgICAgICB3aWR0aD17OTZ9XHJcbiAgICAgICAgICAgIGhlaWdodD17OTZ9XHJcbiAgICAgICAgICAgIHByaW9yaXR5XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkXCI+XHJcbiAgICAgICAgICBCdXNpbmVzcyBQYXJ0bmVyIFJlZ2lzdHJhdGlvbiBGb3JtXHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxQcm9ncmVzc1N0ZXBzIHN0ZXBzPXtzdGVwc1dpdGhTdGF0dXN9IGN1cnJlbnRTdGVwPXtjdXJyZW50U3RlcH0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkltYWdlIiwiZm9ybVN0ZXBzIiwidXNlRm9ybVN0b3JlIiwiUHJvZ3Jlc3NTdGVwcyIsInVzZU1lbW8iLCJsb2dvIiwiRm9ybUhlYWRlciIsImN1cnJlbnRTdGVwIiwic3RlcHNXaXRoU3RhdHVzIiwibWFwIiwic3RlcCIsImluZGV4Iiwic3RhdHVzIiwiZGl2IiwiY2xhc3NOYW1lIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJwcmlvcml0eSIsImgxIiwic3RlcHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/layout/form-header.tsx\n"));

/***/ })

});