# playwright-web-ui-ts-fundamentals

<h2>Description</h2>
<p>This project shows how to use Playwright with TypeScript for web automation testing. It includes different approaches and techniques that are useful for testing complex UI.</p>

<h2>What is demonstrated in this example?</h2>
<ul>
    <li><strong>Finding and defining locators</strong> to interact with page elements.</li>
    <li><strong>Working with different UI components</strong>, such as:
        <ul>
            <li>Input fields</li>
            <li>Checkboxes</li>
            <li>Radio Buttons</li>
            <li>Dropdown lists</li>
            <li>Tooltips</li>
            <li>Dialog Box</li>
            <li>Web Tables</li>
            <li>Date Pickers</li>
            <li>Sliders</li>
        </ul>
    </li>
    <li><strong>Waitings</strong> – using waits to make tests stable.</li>
    <li><strong>Drag and Drop</strong> – moving elements on the page.</li>
    <li><strong>Page Object Model (POM)</strong> – structuring tests using the POM pattern.</li>
    <li><strong>Page Manager & Helper Base Class</strong> – using a page manager and base helper class to organize tests.</li>
</ul>

<h2>Installation and Running</h2>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/y-tikhenkiy/playwright-web-ui-ts-fundamentals</code></pre>
        <pre><code>cd pw-fundamentals</code></pre>
    </li>
    <li>Install dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Run tests:
        <pre><code>npx playwright test</code></pre>
    </li>
    <li>View test reports:
        <pre><code>npx playwright show-report</code></pre>
    </li>
</ol>

h2>Project Structure</h2>
<ul>
    <li><strong>pw-fundamentals/</strong>
        <ul>
            <li><strong>tests/</strong> - Test files
                <ul>
                    <li><code>autoWaitins.spec.ts</code> - different builtin waiter examples</li>
                    <li><code>dragAndDropWithiFrame.spec.ts</code> - simple examples how to interact with drag&drop under iframe</li>
                    <li><code>firstTest.spec.ts</code> - all possible locators syntax, extracting values, assertions</li>
                    <li><code>uiComponents.spec.ts</code> - Input fields, Checkboxes, Radio Buttons, Dropdown listi, Tooltips, Dialog Box, Web Tables, Date Pickers, Sliders</li>
                    <li><code>usePageObjects.spec.ts</code> - tests usnig the POM example</li>
                </ul>
            </li>
            <li><strong>pages-objects/</strong> - Page Object Model implementation
                <ul>
                    <li><code>datepickerPage.ts</code> - ...</li>
                    <li><code>formLayoutsPage.ts</code> - ...</li>
                    <li><code>helperBase.ts</code> - ...</li>
                    <li><code>navigationPage.ts</code> - ...</li>
                    <li><code>navigationPageAlternative.ts</code> - ...</li>
                    <li><code>pageManager.ts</code> - ...</li>
                </ul>
            </li>
            <li><code>playwright.config.ts</code> - Playwright configuration</li>
            <li><code>package.json</code> - Dependencies</li>
        </ul>
    </li>
</ul>

<h2>Conclusion</h2>
<p>This project helps to quickly understand the key features of Playwright with TypeScript. You can use it as a base to expand test coverage for your web application.</p>