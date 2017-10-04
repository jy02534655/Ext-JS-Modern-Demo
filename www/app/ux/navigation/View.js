Ext.define('ux.navigation.View', {
    extend: 'Ext.Container',
    alternateClassName: 'ux.NavigationView',
    xtype: 'uxNavigationView',
    requires: ['ux.navigation.Bar'],

    config: {
        /**
         * @cfg {Boolean/Object} navigationBar
         * The NavigationBar used in this navigation view. It defaults to be docked to the top.
         *
         * You can just pass in a normal object if you want to customize the NavigationBar. For example:
         *
         *     navigationBar: {
         *         ui: 'dark',
         *         docked: 'bottom'
         *     }
         *
         * You **cannot** specify a *title* property in this configuration. The title of the navigationBar is taken
         * from the configuration of this views children:
         *
         *     view.push({
         *         title: 'This views title which will be shown in the navigation bar',
         *         html: 'Some HTML'
         *     });
         *
         * @accessor
         */
        navigationBar: {
            docked: 'top'
        },

        /**
         * @cfg {String} defaultBackButtonText
         * The text to be displayed on the back button if:
         *
         * - The previous view does not have a title.
         * - The {@link #useTitleForBackButtonText} configuration is `true`.
         * @accessor
         */
        defaultBackButtonText: '返回',

        /**
         * @cfg {Boolean} useTitleForBackButtonText
         * Set to `false` if you always want to display the {@link #defaultBackButtonText} as the text
         * on the back button. `true` if you want to use the previous views title.
         * @accessor
         */
        useTitleForBackButtonText: false,

        /**
         * @cfg {Array/Object} items The child items to add to this NavigationView. This is usually an array of Component
         * configurations or instances, for example:
         *
         *     Ext.create('Ext.Container', {
         *         items: [
         *             {
         *                 xtype: 'panel',
         *                 title: 'My title',
         *                 html: 'This is an item'
         *             }
         *         ]
         *     });
         *
         * If you want a title to be displayed in the {@link #navigationBar}, you must specify a `title` configuration in your
         * view, like above.
         *
         * __Note:__ Only one view will be visible at a time. If you want to change to another view, use the {@link #method-push} or
         * {@link #setActiveItem} methods.
         * @accessor
         */

        /**
         * @cfg {Object}
         * Layout used in this navigation view, type must be set to 'card'.
         * **Android NOTE:** Older Android devices have poor animation performance. It is recommended to set the animation to null, for example:
         *
         *      layout: {
         *          type: 'card',
         *          animation: null
         *      }
         *
         * @accessor
         */
        layout: {
            type: 'card',
            animation: {
                duration: 300,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left'
            }
        }
    },

    baseCls: Ext.baseCSSPrefix + 'navigationview',

    /**
     * @event push
     * Fires when a view is pushed into this navigation view
     * @param {Ext.navigation.View} this The component instance
     * @param {Mixed} view The view that has been pushed
     */

    /**
     * @event pop
     * Fires when a view is popped from this navigation view
     * @param {Ext.navigation.View} this The component instance
     * @param {Mixed} view The view that has been popped
     */

    /**
     * @event back
     * Fires when the back button in the navigation view was tapped.
     * @param {Ext.navigation.View} this The component instance\
     */

    /**
     * @private
     */
    initialize: function () {
        var me = this,
        navBar = me.getNavigationBar();
        me.callParent();
        //监听导航栏返回按钮
        if (navBar) {
            navBar.on({
                back: me.onBackButtonTap,
                scope: me
            });

            me.relayEvents(navBar, 'rightbuttontap');

            me.relayEvents(me, {
                add: 'push',
                remove: 'pop'
            });
        }

        //<debug>
        var layout = me.getLayout();
        if (layout && !layout.isCard) {
            Ext.Logger.error('The base layout for a NavigationView must always be a Card Layout');
        }
        //</debug>
    },
    //更新标题
    setTitle: function (text) {
        var me = this,
        nav = me.getNavigationBar();
        nav.setTitle(text);
        nav.backButtonStack[nav.backButtonStack.length - 1].title = text;
    },
    /**
     * @private
     * 点击返回按钮
     */
    onBackButtonTap: function () {
        this.pop();
        this.fireEvent('back', this);
    },
    /**
     * Pushes a new view into this navigation view using the default animation that this view has.
     * @param {Object} view The view to push.
     * @return {Ext.Component} The new item you just pushed.
     */
    push: function (view) {
        return this.add(view);
    },

    /**
      * 不填写参数时，移除当前项，返回到上一项
      * 如果参数是数字，则从最后一项开始移除指定数目的项
      * 如果参数是string,则移除指定类型的项
      * 如果参数是项，则移除传入的项
      * 不论参数如何，都会保留一个活动项
      * @return {Ext.Component} 当前活动项
      */
    pop: function (count) {
        if (this.beforePop(count)) {
            return this.doPop();
        }
    },

    /*删除指定项*/
    beforePop: function (count) {
        var me = this,
        innerItems = me.getInnerItems(),
        last,
        i,
        ln,
        toRemove;

        if (Ext.isString(count) || Ext.isObject(count)) {
            last = innerItems.length - 1;

            for (i = last; i >= 0; i--) {
                if ((Ext.isString(count) && Ext.ComponentQuery.is(innerItems[i], count)) || (Ext.isObject(count) && count == innerItems[i])) {
                    count = last - i;
                    break;
                }
            }

            if (!Ext.isNumber(count)) {
                return false;
            }
        }

        ln = innerItems.length;

        //default to 1 pop
        if (!Ext.isNumber(count) || count < 1) {
            count = 1;
        }

        //check if we are trying to remove more items than we have
        count = Math.min(count, ln - 1);

        if (count) {
            //we need to reset the backButtonStack in the navigation bar
            me.getNavigationBar().beforePop(count);

            //get the items we need to remove from the view and remove theme
            toRemove = innerItems.splice(-count, count - 1);
            for (i = 0; i < toRemove.length; i++) {
                this.remove(toRemove[i]);
            }

            return true;
        }

        return false;
    },

    /**
    * @private
    */
    doPop: function () {
        var me = this,
        innerItems = this.getInnerItems();

        //set the new active item to be the new last item of the stack 
        me.remove(innerItems[innerItems.length - 1]);

        // Hide the backButton
        if (innerItems.length < 3 && this.$backButton) {
            this.$backButton.hide();
        }

        // Update the title container
        if (this.$titleContainer) {
            //<debug>
            if (!this.$titleContainer.setTitle) {
                Ext.Logger.error(['You have selected to display a title in a component that does not ', 'support titles in NavigationView. Please remove the `title` configuration from your ', 'NavigationView item, or change it to a component that has a `setTitle` method.'].join(''));
            }
            //</debug>
            var item = innerItems[innerItems.length - 2];
            this.$titleContainer.setTitle((item.getTitle) ? item.getTitle() : item.config.title);
        }

        return this.getActiveItem();
    },

    /**
    * 返回上一项
    * @return {Mixed} The previous view
    */
    getPreviousItem: function () {
        var innerItems = this.getInnerItems();
        return innerItems[innerItems.length - 2];
    },

    /**
    * Updates the backbutton text accordingly in the {@link #navigationBar}
    * @private
    */
    updateUseTitleForBackButtonText: function (useTitleForBackButtonText) {
        var navigationBar = this.getNavigationBar();
        if (navigationBar) {
            navigationBar.setUseTitleForBackButtonText(useTitleForBackButtonText);
        }
    },

    /**
    * Updates the backbutton text accordingly in the {@link #navigationBar}
    * @private
    */
    updateDefaultBackButtonText: function (defaultBackButtonText) {
        var navigationBar = this.getNavigationBar();
        if (navigationBar) {
            navigationBar.setDefaultBackButtonText(defaultBackButtonText);
        }
    },

    /**
    * This is called when an Item is added to the BackButtonContainer of a SplitNavigation View
    * @private
    *
    * @param toolbar
    * @param item
    */
    onBackButtonContainerAdd: function (toolbar, item) {
        item.on({
            scope: this,
            show: this.refreshBackButtonContainer,
            hide: this.refreshBackButtonContainer
        });
        this.refreshBackButtonContainer();
    },

    /**
    * This is called when an Item is removed from the BackButtonContainer of a SplitNavigation View
    * @private
    *
    * @param toolbar
    * @param item
    */
    onBackButtonContainerRemove: function (toolbar, item) {
        item.un({
            scope: this,
            show: this.refreshBackButtonContainer,
            hide: this.refreshBackButtonContainer
        });
        this.refreshBackButtonContainer();
    },

    /**
    * This is used for Blackberry SplitNavigation to monitor the state of child items in the bottom toolbar.
    * if no visible children exist the toolbar will be hidden
    * @private
    */
    refreshBackButtonContainer: function () {
        if (!this.$backButtonContainer) {
            return;
        }
        var i = 0,
        backButtonContainer = this.$backButtonContainer,
        items = backButtonContainer.items,
        item;

        for (; i < items.length; i++) {
            item = items.get(i);
            if (!item.isHidden()) {
                this.$backButtonContainer.show();
                return;
            }
        }

        this.$backButtonContainer.hide();
    },

    /**
    * @private
    */
    applyNavigationBar: function (config) {
        var me = this;
        if (!config) {
            config = {
                hidden: true,
                docked: 'top'
            };
        }

        // Call the getter for items on this view to insure that they will be
        // available (via innerItems) for the navigationBar created below.
        me.getItems();

        if (config.title) {
            delete config.title;
            //<debug>
            Ext.Logger.warn("Ext.navigation.View: The 'navigationBar' configuration does not accept a 'title' property. You " + "set the title of the navigationBar by giving this navigation view's children a 'title' property.");
            //</debug>
        }

        config.view = me;
        config.useTitleForBackButtonText = me.getUseTitleForBackButtonText();
        // Blackberry specific nav setup where title is on the top title bar and the bottom toolbar is used for buttons and BACK
        if (config.splitNavigation) {
            me.$titleContainer = me.add({
                docked: 'top',
                xtype: 'titlebar',
                ui: 'light',
                title: me.$currentTitle || ''
            });

            var containerConfig = (config.splitNavigation === true) ? {} : config.splitNavigation;

            me.$backButtonContainer = me.add({
                xtype: 'toolbar',
                docked: 'bottom',
                hidden: true
            });

            // Any item that is added to the BackButtonContainer should be monitored for visibility
            // this will allow the toolbar to be hidden when no items exist in it.
            me.$backButtonContainer.on({
                scope: me,
                add: me.onBackButtonContainerAdd,
                remove: me.onBackButtonContainerRemove
            });

            me.$backButton = me.$backButtonContainer.add({
                xtype: 'button',
                text: 'Back',
                hidden: true,
                ui: 'back'
            });

            // Default config items go into the bottom bar
            if (config.items) {
                me.$backButtonContainer.add(config.items);
            }

            // If the user provided items and splitNav items, default items go into the bottom bar, split nav items go into the top
            if (containerConfig.items) {
                me.$titleContainer.add(containerConfig.items);
            }

            me.$backButton.on({
                scope: me,
                tap: me.onBackButtonTap
            });

            config = {
                hidden: true,
                docked: 'top'
            };
        }

        return Ext.factory(config, ux.navigation.Bar, this.getNavigationBar());
    },

    /**
    * @private
    */
    updateNavigationBar: function (newNavigationBar, oldNavigationBar) {
        if (oldNavigationBar) {
            this.remove(oldNavigationBar, true);
        }

        if (newNavigationBar) {
            this.add(newNavigationBar);
        }
    },

    /**
    * @private
    */
    applyActiveItem: function (activeItem, currentActiveItem) {
        var me = this,
        innerItems = me.getInnerItems();

        // 确保项目已初始化
        me.getItems();

        // 如果没有初始化, 将最后的子项激活
        if (!me.initialized) {
            activeItem = innerItems.length - 1;
        }

        return this.callParent([activeItem, currentActiveItem]);
    },

    doResetActiveItem: function (innerIndex) {
        var me = this,
        innerItems = me.getInnerItems(),
        animation = me.getLayout().getAnimation();

        if (innerIndex > 0) {
            if (animation && animation.isAnimation) {
                animation.setReverse(true);
            }
            me.setActiveItem(innerIndex - 1);
            me.getNavigationBar().onViewRemove(me, innerItems[innerIndex], innerIndex);
        }
    },

    /**
    * @private
    */
    doRemove: function () {
        var animation = this.getLayout().getAnimation();

        if (animation && animation.isAnimation) {
            animation.setReverse(false);
        }

        this.callParent(arguments);
    },

    /**
    * @private
    */
    onItemAdd: function (item, index) {
        var me = this,
        initialized = me.initialized,
        navigationBar;

        // 检测title配置
        if (item && item.getDocked() && item.config.title === true) {
            me.$titleContainer = item;
        }

        me.doItemLayoutAdd(item, index);

        if (initialized && item.isInnerItem()) {
            me.setActiveItem(item);

            navigationBar = this.getNavigationBar();
            // 更新navigationBar
            if (navigationBar) {
                this.getNavigationBar().onViewAdd(me, item, index);

            }

            // 更新返回按钮
            if (me.$backButtonContainer) {
                me.$backButton.show();
            }
        }
        if (item && item.isInnerItem()) {
            // 更新标题
            me.updateTitleContainerTitle((item.getTitle) ? item.getTitle() : item.config.title);
        }

        if (initialized) {
            me.fireEvent('add', me, item, index);
        }

    },

    /**
    * @private
    * 更新titleContainer的标题，如果存在
    */
    updateTitleContainerTitle: function (title) {
        if (this.$titleContainer) {
            //<debug>
            if (!this.$titleContainer.setTitle) {
                Ext.Logger.error(['You have selected to display a title in a component that does not ', 'support titles in NavigationView. Please remove the `title` configuration from your ', 'NavigationView item, or change it to a component that has a `setTitle` method.'].join(''));
            }
            //</debug>
            this.$titleContainer.setTitle(title);
        } else {
            this.$currentTitle = title;
        }
    },

    /**
    * 移除第一项和最后项之间的所有项（包括最后项）
    * @return {Ext.Component} The view that is now active
    */
    reset: function () {
        return this.pop(this.getInnerItems().length);
    }
});