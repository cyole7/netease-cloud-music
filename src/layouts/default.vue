<template>
  <NLayout h-full text-center text-gray-700 dark:text-gray-200 :native-scrollbar="false">
    <NLayoutHeader h-15>
      header
    </NLayoutHeader>
    <NLayoutContent>
      <RouterView />
    </NLayoutContent>
    <NLayoutFooter>footer</NLayoutFooter>
  </NLayout>
</template>
