<template>
  <main h-full text-gray-700 dark:text-gray-200 flex="~ col">
    <header h-header shrink-0>
      <AppHeader />
    </header>
    <NLayout :native-scrollbar="false">
      <RouterView />
    </NLayout>
    <footer h-footer shrink-0 shadow-footer relative>
      footer
    </footer>
  </main>
</template>
