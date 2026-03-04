       function aVc(a, b) {
                var c, d, e, f, h, k, l;
                w(function(m) {
                        switch (m.nextAddress) {
                        case 1:
                                return c = new zO,
                                e = "unknown",
                                m.setCatchFinallyBlocks(2, 3),
                                f = new N7(a.getKernel().getKernelXhr(),""),
                                m.yield($G(UQc(f), 3E4), 5);
                        case 5:
                                e = m.yieldResult;
                        case 3:
                                m.enterFinallyBlock();
                                d = c.finish();
                                m.leaveFinallyBlock(4);
                                break;
                        case 2:
                                h = m.enterCatchBlock();
                                PO(h);
                                e = "unknown";
                                m.jumpTo(3);
                                break;
                        case 4:
                                SO(20, "auto_diagnose_crash", e, d);
                                k = bVc(a, b, e);
                                switch (e) {
                                case "out_of_memory":
                                        l = "Your session crashed after using all available RAM.";
                                        break;
                                case "x_server_error":
                                        l = "Your session crashed after requesting an X window. The X window system is not available in Colab.";
                                        break;
                                default:
                                        l = "Your session crashed for an unknown reason."
                                }
                                b.set({
                                        actionLink: k,
                                        message: l,
                                        timeoutMillis: -1
                                });
                                m.jumpToEnd()
                        }
                })
        }
        function bVc(a, b, c) {
                var d = (c = lQ(a.getSubscription()) && c === "out_of_memory" && a.getNotebookModel().getMachineShape() === "s") ? function() {
                        return cVc(a)
                }
                : function() {
                        return a.viewRuntimeLogs(20)
                }
                ;
                return {
                        message: c ? "Get more RAM" : "View runtime logs",
                        action: function() {
                                d();
                                b.clear()
                        }
                }
        }
        function cVc(a) {
                var b, c, d;
                return w(function(e) {
                        if (e.nextAddress == 1)
                                return b = Ok.highMemoryNotebookSettings(lQ(a.getSubscription())),
                                e.yield(jN({
                                        title: "Switch to a high-RAM runtime?",
                                        message: b ? "Your session crashed after using all available RAM. Would you like to use a high-RAM runtime with this notebook? Your current runtime's state will be lost, including local files. You can change this at any time with 'Change runtime type' in the 'Runtime' menu." : "Your session crashed after using all available RAM. Would you like to use a high-RAM runtime with this notebook? Your current runtime's state will be lost, including local files.",
                                        yesText: "Yes",
                                        noText: "No"
                                }), 2);
                        (c = e.yieldResult) && a.getNotebookModel().setMachineShape("hm");
                        d = c ? "accepted" : "rejected";
                        SO(20, "offer_high_mem", d);
                        e.jumpToEnd()
                })
        }
        g.viewRuntimeLogs = function(a) {
                var b = this, c, d, e, f, h, k, l, m;
                return w(function(n) {
                        switch (n.nextAddress) {
                        case 1:
                                return c = new zO,
                                f = !1,
                                n.setCatchFinallyBlocks(2, 3),
                                h = new N7(b.getKernel().getKernelXhr(),""),
                                n.yield(IO(h.getFile("/var/colab/app.log"), {
                                        capture: !0,
                                        traceDetails: CO("api_resources_log_get")
                                }), 5);
                        case 5:
                                return k = n.yieldResult,
                                n.yield(b.fileViewerManager.open(k), 6);
                        case 6:
                                (l = n.yieldResult) || k.fetch(),
                                d = l ? "opened" : "downloaded",
                                f = !0;
                        case 3:
                                n.enterFinallyBlock();
                                e = c.finish();
                                n.leaveFinallyBlock(4);
                                break;
                        case 2:
                                m = n.enterCatchBlock();
                                cN(j9a("/var/colab/app.log"), {
                                        error: m
                                });
                                PO(m);
                                n.jumpTo(3);
                                break;
                        case 4:
                                f && SO(a, "view-runtime-logs", d, e),
                                n.jumpToEnd()
                        }
                })
        }
        ;
        g.onLeftPanePageChange = function(a) {
                O6.prototype.onLeftPanePageChange.call(this, a);
                a === tL && (this.fileBrowser.currentTree || (this.getKernel().isRunning() ? this.kernelFiles && this.fileBrowser.setFiles(this.kernelFiles, this.fileViewerManager) : this.attemptAutoconnect(1)),
                this.fileBrowser.setDisplayed(!0),
                SO(18, "open_browser"))
        }
        ;
        function KUc(a) {
                var b = a.getKernel()
                  , c = b.runtime;
                a.kernelFiles = new N7(b.getKernelXhr(),c && d9b(c) ? "" : "content",b.getEnvHome());
                a.fileBrowser && a.fileBrowser.setFiles(a.kernelFiles, a.fileViewerManager)
        }
        g.handleCellExecutionCompleted = function(a) {
                $Uc(this);
                this.isCloudEmbedded && MN({
                        type: "cell_execution_completed",
                        cellId: a.cellId,
                        error: a.error
                })
        }
        ;
        function JUc(a) {
                a.idleTimer != null && (ls(a.idleTimer),
                a.idleTimer = void 0)
        }
        function $Uc(a) {
                JUc(a);
                var b = a.getKernel();
                b.isRunning() && (b = b.idleTimeoutInterval) && (a.idleTimer = ks(function() {
                        a.isExecuting() || dVc(a)
                }, ZLa(b) * 1E3))
        }
        g.userInteractionOccurred = function() {
                $Uc(this)
        }
        ;
        g.viewFile = function(a, b, c) {
                if (a.scheme === "file") {
                        var d = 1;
                        b && (d = b.startLineNumber);
                        (b = $Qb(a.path)) ? xwc(this, b, d, void 0, c) : eVc(this, a.path, d)
                } else
                        O6.prototype.viewFile.call(this, a, b, c)
        }
        ;
        function fVc(a) {
                var b = a.indexOf("Z");
                if (b !== 23)
                        return null;
                a = Date.parse(a.substring(0, b + 1));
                return isNaN(a) ? null : (new Date(a)).toLocaleTimeString()
        }
        function gVc(a) {
                var b = fVc(a);
                return b ? ["deadlineExceeded", "A deadline was exceeded"].some(function(c) {
                        return a.includes(c)
                }) ? {
                        cause: "deadlineExceeded",
                        message: null
                } : ["internalError", "internal error"].some(function(c) {
                        return a.includes(c)
                }) ? {
                        cause: "internalError",
                        message: null
                } : a.endsWith("QueryManager timed out") ? {
                        cause: "timeout",
                        message: "A Google Drive timeout has occurred (most recently at " + b + ").",
                        actionLink: {
                                message: "More info",
                                action: "https://research.google.com/colaboratory/faq.html#drive-timeout"
                        }
                } : ["userRateLimitExceeded", "The download quota for this file has been exceeded", "User rate limit exceeded", "QUOTA_EXCEEDED"].some(function(c) {
                        return a.includes(c)
                }) ? {
                        cause: "quota",
                        message: "A Google Drive quota has been exceeded (most recently at " + b + ").",
                        actionLink: {
                                message: "More info",
                                action: "https://research.google.com/colaboratory/faq.html#drive-quota"
                        }
                } : a.includes("The user has exceeded their Drive storage quota") ? {
                        cause: "storageFull",
                        message: "Google Drive storage quota has been exceeded (most recently at " + b + ").",
                        actionLink: {
                                message: "More info",
                                action: "https://research.google.com/colaboratory/faq.html#drive-full"
                        }
                } : {
                        cause: "unknown",
                        message: "A Google Drive error has occurred."
                } : {
                        cause: "unknown",
                        message: "A Google Drive error has occurred."
                }
        }
        function hVc(a) {
                var b, c, d, e, f, h, k, l, m, n, p;
                return w(function(q) {
                        if (q.nextAddress == 1)
                                return b = a.getKernel(),
                                q.yield(b.getKernelXhr().get("/api/colab/drive"), 2);
                        c = q.yieldResult;
                        d = IN(c);
                        e = JSON.parse(d);
                        h = (f = e.dfs) != null ? f : [];
                        k = h.length > 0 ? h[h.length - 1] : void 0;
                        if (!k || a.getOperativeNotebookSettings().hasDriveHealthCheckMessage(k))
                                return q.return();
                        l = gVc(k);
                        m = l.cause;
                        n = l.message;
                        p = l.actionLink;
                        n && kM({
                                message: n,
                                actionLink: p,
                                timeoutMillis: -1
                        });
                        SO(20, "drive_unhealth", m);
                        q.jumpToEnd()
                })
        }
        function ZUc(a) {
                var b = a.getKernel();
                (b = b && b.runtime) && b.kind === "gce" && (OUc(a),
                a.driveHealthCheckTimer = ks(function() {
                        return w(function(c) {
                                if (c.nextAddress == 1)
                                        return c.setFinallyBlock(2),
                                        c.yield(hVc(a), 2);
                                c.enterFinallyBlock();
                                a.driveHealthCheckTimer != null && ZUc(a);
                                return c.leaveFinallyBlock(0)
                        })
                }, iVc.KERNEL_DRIVE_HEALTH_CHECK_INTERVAL_MILLIS))
        }
        function OUc(a) {
                a.driveHealthCheckTimer != null && (ls(a.driveHealthCheckTimer),
                a.driveHealthCheckTimer = void 0)
        }
        function dVc(a) {
                var b = a.getKernel();
                if (b.isRunning()) {
                        b.disconnect();
                        (b = b.getTerminalConnection()) && b.disconnect();
                        SO(13, "disconnect", "inactivity");
                        b = "Your runtime has been disconnected due to inactivity or reaching its maximum duration.";
                        var c, d = a.getSubscription(), e = TY("idle_timeout_dialog", "dialog", {
                                proPlus: oQ(d)
                        });
                        if (nQ(d)) {
                                UY("idle_timeout_dialog");
                                var f = wyc({
                                        productName: oJ(),
                                        signupUrl: e
                                }).toSafeHtml();
                                bP() && (c = V(tUc, "idle_timeout_dialog"))
                        } else
                                oQ(d) ? (UY("idle_timeout_dialog", {
                                        proPlus: !0
                                }),
                                b = "The runtime disconnected due to inactivity. As a " + vJ + " subscriber your idle timeouts are more lenient than they are for non-subscribers, but runtime durations are still not guaranteed or unlimited.",
                                f = xyc({
                                        plusProductName: pJ(),
                                        signupUrl: e
                                }).toSafeHtml(),
                                bP() && (c = V(uUc, "idle_timeout_dialog"))) : mQ(a.getSubscription()) && (b = "The runtime disconnected due to inactivity. As a " + xJ + " subscriber your idle timeouts are more lenient than they are for both non-subscribers and " + vJ + ", but runtime durations are still not guaranteed or unlimited.");
                        d = iN(nJ.signupFaq("idle-timeouts"), "Learn more");
                        jN({
                                title: "Runtime disconnected",
                                yesText: "Reconnect",
                                noText: "Close",
                                message: V(vUc, b, d, f ? tM(f) : "", c ? c : "")
                        }).then(function(h) {
                                h && a.attemptAutoconnect(2)
                        })
                } else
                        PO(Error("onKernelActivityIdle_ when disconnected"))
        }
        g.confirmCodeExecution = function() {
                var a = this;
                return w(function(b) {
                        return b.nextAddress == 1 ? b.yield(jVc(a), 2) : b.yield(kVc(a), 0)
                })
        }
        ;
        function jVc(a) {
                var b, c, d, e, f, h, k, l, m, n, p, q, v, y, D, H, K, N, O, X, ja, na;
                return w(function(sa) {
                        switch (sa.nextAddress) {
                        case 1:
                                return a.confirmedCodeExecution || lVc(a, {
                                        trustByDefault: !0
                                }) ? (a.confirmedCodeExecution = !0,
                                sa.return(Promise.resolve())) : sa.yield(qib(), 2);
                        case 2:
                                b = a.getNotebookModel();
                                c = b.getFileId();
                                e = (d = QJ(c)) ? b.getOwnerEmails() : "";
                                h = (f = c.source === "github" || c.source === "gist") ? "GitHub" : "";
                                k = f ? nJ.getNonColabUrl(c, a.getTraits().getSessionIndex()) || "" : "";
                                l = LN(iJ.getUsername());
                                m = a.getNotebookModel().cellExecutionStrategy !== "none";
                                var ra = e
                                  , ma = h
                                  , za = k
                                  , Na = l
                                  , Ea = m
                                  , bb = '<div class="flex">';
                                ra ? (Na = "This notebook was authored by <b>" + Sr(ra) + "</b>. It may request access to your data stored with Google, or read data and credentials from other sessions. Please review the source code before executing this notebook. Please contact the creator of this notebook at " + Sr(ra) + " with any additional questions.",
                                bb += Na) : ma ? (ra = 'This notebook is being loaded from <a href="' + ($r(ds(za)) + '" target="_blank"><b>') + Sr(ma) + "</b></a>. It may request access to your data stored with Google, or read data and credentials from other sessions. Please review the source code before executing this notebook.",
                                bb += ra,
                                Na && (bb += '<br><br>Are you the owner of this repo? Want to remove this warning?&nbsp;<a href="http://go/publish-external-colab" target="_blank">go/publish-external-colab</a>')) : bb += "This notebook was authored by an unknown user, not by Google. It may request access to your data stored with Google, or read data and credentials from other sessions. Please review the source code before executing this notebook.";
                                bb += "<br><br>" + (Ea ? Sr("This notebook is configured to automatically run the first cell or section.") : "") + "</div>";
                                n = Ur(bb).toSafeHtml();
                                p = [hN({
                                        formId: "external-notebook-authored-dialog"
                                }), fN({
                                        buttonText: "Run anyway",
                                        formId: "external-notebook-authored-dialog"
                                })];
                                q = eN({
                                        heading: "Warning: This notebook was not authored by Google",
                                        content: V(wUc, tM(n)),
                                        actions: p,
                                        isAlert: !0,
                                        classes: ["wide"],
                                        formId: "external-notebook-authored-dialog"
                                });
                                v = q.dialog;
                                y = q.closePromise;
                                D = v.querySelectorAll("md-text-button,md-filled-button");
                                H = t(D);
                                for (K = H.next(); !K.done; K = H.next())
                                        N = K.value,
                                        N.disabled = !0;
                                return sa.yield(lx(1E3), 3);
                        case 3:
                                O = t(D);
                                for (X = O.next(); !X.done; X = O.next())
                                        ja = X.value,
                                        ja.disabled = !1;
                                return sa.yield(y, 4);
                        case 4:
                                na = sa.yieldResult;
                                if (na !== "ok")
                                        throw new oZ;
                                a.confirmedCodeExecution = !0;
                                sa.jumpToEnd()
                        }
                })
        }
        function lVc(a, b) {
                b = b.trustByDefault;
                a = a.getNotebookModel();
                var c = a.getFileId();
                return QJ(c) ? (b = a.owners || [],
                b.length !== 1 ? !1 : LN(b[0].emailAddress) && LN(iJ.getUsername()) ? !0 : a.isOwnedByMe()) : c.source === "github" ? (b = new Yn(c.fileId),
                b = MJ(b),
                oDc(b)) : c.source === "gist" || c.source === "url" ? !1 : b
        }
        g.hasTrustedNotebookContext = function() {
                var a = this, b, c, d;
                return w(function(e) {
                        if (lVc(a, {
                                trustByDefault: !1
                        }))
                                return e.return(!0);
                        b = Lc(uP);
                        return e.return(b((d = (c = a.getNotebookModel().getSelectedNotebookAiContextContent()) == null ? void 0 : c.getId()) != null ? d : "default"))
                })
        }
        ;
        function kVc(a) {
                var b, c, d;
                return w(function(e) {
                        switch (e.nextAddress) {
                        case 1:
                                return e.yield(a.isSoleAuthored(), 2);
                        case 2:
                                if (b = e.yieldResult)
                                        return e.return();
                                c = a.getKernel();
                                if (c.isConnected() && !a.shouldRefreshKernelConnectionDetails) {
                                        e.jumpTo(3);
                                        break
                                }
                                return e.yield(c.refreshConnectionDetails(), 4);
                        case 4:
                                a.shouldRefreshKernelConnectionDetails = !1;
                        case 3:
                                return c.areUserCredentialsAllowed() ? e.yield(jN({
                                        title: "New runtime required",
                                        message: "This notebook has potentially been modified by another user. You have previously permitted this notebook to modify files in your Google Drive. The modifications outside of this session may contain possible insecure code. If you would like to execute additional code, you must assign a new runtime.",
                                        yesText: "Assign new runtime"
                                }), 5) : e.return();
                        case 5:
                                d = e.yieldResult;
                                if (!d)
                                        throw new oZ;
                                return e.yield(c.unassignCurrentVm({
                                        skipConfirm: !0
                                }), 6);
                        case 6:
                                return e.yield(a.attemptAutoconnect(2), 0)
                        }
                })
        }
        g.isSoleAuthored = function() {
                var a = this, b;
                return w(function(c) {
                        return c.nextAddress == 1 ? c.yield(a.getAuthorship(), 2) : (b = c.yieldResult) ? c.return(b.isSoleAuthored()) : c.return(!1)
                })
        }
        ;
        g.installIfNeeded = function() {
                var a, b;
                return w(function(c) {
                        switch (c.nextAddress) {
                        case 1:
                                return !lH || aP() ? c.return() : c.yield(elb(), 2);
                        case 2:
                                if (a = c.yieldResult)
                                        return c.return();
                                c.setCatchFinallyBlocks(3);
                                return c.yield(flb(), 5);
                        case 5:
                                c.leaveTryBlock(0);
                                break;
                        case 3:
                                throw b = c.enterCatchBlock(),
                                cN("Google Drive installation failed.", {
                                        error: b
                                }),
                                b;
                        }
                })
        }
        ;
        g.saveNotebook = function(a, b) {
                var c = this;
                a = a === void 0 ? !1 : a;
                b = b === void 0 ? !1 : b;
                var d = this.getNotebookModel();
                if (d.saveable())
                        return O6.prototype.saveNotebook.call(this, a, b);
                if (RJ(d.getFileId()))
                        return mVc(this);
                a = {
                        message: d.getPermissions().isNotebookFileWriteable() ? "This notebook is in playground mode. Changes will not be saved unless you make a copy of the notebook." : "You do not have permission to save this notebook. To keep your changes, make a copy of the notebook.",
                        title: "Cannot save changes",
                        yesText: "Save a copy in Drive",
                        noText: "Cancel"
                };
                return jN(a).then(function(e) {
                        e && c.commandHandler.execute(SK, 13)
                })
        }
        ;
        g.authorizeForBackgroundExecutionIfNeeded = function() {
                var a = this, b;
                return w(function(c) {
                        if (l3a === "")
                                return c.return();
                        b = a.getNotebookModel().getFileId();
                        return QJ(b) ? c.yield(hlb(b.getDriveFile(), {
                                appId: l3a
                        }), 0) : c.return()
                })
        }
        ;
        g.enableAuth = function(a) {
                var b = this, c, d, e;
                return w(function(f) {
                        switch (f.nextAddress) {
                        case 1:
                                switch (a) {
                                case "dfs_ephemeral":
                                        break;
                                case "auth_user_ephemeral":
                                        break;
                                case "dfs_persistent":
                                        throw Error("credsType=" + a + " is not supported");
                                default:
                                        ad(a, "credsType=" + a + " is not supported")
                                }
                                c = !1;
                                f.setCatchFinallyBlocks(2);
                                return f.yield(nVc(b, a), 4);
                        case 4:
                                d = f.yieldResult;
                                SO(27, "enable_auth", "creds_type=" + a + " propagated=" + d.propagated + " failureReason=" + d.fallbackReason);
                                c = d.propagated;
                                f.leaveTryBlock(3);
                                break;
                        case 2:
                                e = f.enterCatchBlock(),
                                PO(e);
                        case 3:
                                if (!c)
                                        throw Error("credential propagation was unsuccessful");
                                f.jumpToEnd()
                        }
                })
        }
        ;
        function YUc(a) {
                var b, c, d, e, f, h, k, l, m, n, p, q, v, y, D, H, K, N, O, X, ja;
                w(function(na) {
                        switch (na.nextAddress) {
                        case 1:
                                b = a.getKernel();
                                c = b.runtime;
                                if (!c || !b.isRunning() || aP())
                                        return na.return();
                                d = a.getNotebookModel().getAccelerator();
                                e = a.getNotebookModel().getMachineShape();
                                f = a.getNotebookModel().getAcceleratorModel();
                                h = a.getNotebookModel().getRuntimeVersion();
                                l = (k = b.getEndpoint()) == null ? void 0 : k.getManagedEndpoint();
                                n = (m = b.getEndpoint()) == null ? void 0 : m.getManagedEndpoint();
                                if (!n) {
                                        na.jumpTo(2);
                                        break
                                }
                                p = n.getAccelerator();
                                q = n.getMachineShape();
                                v = n.getAcceleratorModel();
                                y = n.getRuntimeVersion();
                                D = p !== d || q !== e || y !== h || (p === "GPU" || p === "TPU") && v !== f;
                                if (!D) {
                                        na.jumpTo(2);
                                        break
                                }
                                na.setCatchFinallyBlocks(4);
                                return na.yield(a.attemptAutoconnect(2), 6);
                        case 6:
                                na.leaveTryBlock(5);
                                break;
                        case 4:
                                H = na.enterCatchBlock(),
                                H instanceof ZG || PO(H);
                        case 5:
                                c = b.runtime;
                        case 2:
                                K = c.kernel;
                                N = a.getNotebookModel().getKernelSpec();
                                if (!N || K.name === N.name) {
                                        na.jumpTo(7);
                                        break
                                }
                                na.setCatchFinallyBlocks(8);
                                return na.yield(b.changeKernelType(N), 10);
                        case 10:
                                na.leaveTryBlock(7);
                                break;
                        case 8:
                                O = na.enterCatchBlock(),
                                PO(O, "handleRuntimeChange", {
                                        level: 1
                                });
                        case 7:
                                l && (ja = (X = b.getEndpoint()) == null ? void 0 : X.getManagedEndpoint(),
                                ja != null && ja.managedId !== l.managedId && QLc(b, l)),
                                na.jumpToEnd()
                        }
                })
        }
        g.clone = function(a, b) {
                b = b === void 0 ? {} : b;
                b = b.overridePrivateOutputs === void 0 ? !1 : b.overridePrivateOutputs;
                switch (a) {
                case "gist":
                        return oVc(this);
                case "github":
                        return mVc(this);
                case "drive":
                        return this.cloneToDrive({
                                overridePrivateOutputs: b
                        });
                default:
                        throw Error("Unrecognized backend type " + a);
                }
        }
        ;
        function oVc(a) {
                var b;
                return w(function(c) {
                        if (c.nextAddress == 1)
                                return kM({
                                        message: "Creating a copy\u2026",
                                        timeoutMillis: -1
                                }),
                                b = new cDc(!0),
                                c.yield(eDc(b, a.getNotebookModel()), 2);
                        jM();
                        c.jumpToEnd()
                })
        }
        function mVc(a) {
                var b, c, d, e, f, h;
                return w(function(k) {
                        switch (k.nextAddress) {
                        case 1:
                                if (MP()) {
                                        k.jumpTo(2);
                                        break
                                }
                                return k.yield(gV(), 3);
                        case 3:
                                return b = k.yieldResult,
                                b ? k.return(mVc(a)) : (kM({
                                        message: "GitHub authorisation failed"
                                }),
                                k.return());
                        case 2:
                                return c = a.getNotebookModel(),
                                k.yield(iRc(c), 4);
                        case 4:
                                d = k.yieldResult;
                                if (!d)
                                        return k.return();
                                kM({
                                        message: "Creating a copy\u2026",
                                        timeoutMillis: -1
                                });
                                k.setCatchFinallyBlocks(5);
                                return k.yield(d.clone(c), 7);
                        case 7:
                                e = k.yieldResult;
                                jM();
                                e && lM(e);
                                k.leaveTryBlock(0);
                                break;
                        case 5:
                                h = f = k.enterCatchBlock(),
                                jM(),
                                cN(h.message || "Unable to copy notebook.", {
                                        error: h
                                }),
                                k.jumpToEnd()
                        }
                })
        }
        g.getUrlForCommand = function(a) {
                var b = this.getTraits().getSessionIndex();
                switch (a) {
                case "faq":
                        return nJ.FAQ;
                case "ask-on-stackoverflow":
                        return "https://stackoverflow.com/questions/ask?tags=google-colaboratory";
                case "open-colab-enterprise":
                        var c;
                        return (c = sTc({
                                sessionIndex: b
                        })) != null ? c : "";
                case "report-bug":
                        return "https://github.com/googlecolab/colabtools/issues";
                case "view-notebook-source":
                        return nJ.getNonColabUrl(this.getNotebookModel().getFileId(), b) || "";
                case "view-relnotes":
                        return "/notebooks/relnotes.ipynb";
                case "view-tos":
                        return "https://colab.research.google.com/terms";
                default:
                        return ""
                }
        }
        ;
        g.downloadIpynb = function() {
                var a = this.getNotebookModel()
                  , b = a.getIpynbJson();
                gDc(b);
                GN(HN(a.getTitle(), ".ipynb"), rP(b, !0))
        }
        ;
        g.initBottomPane = function() {
                O6.prototype.initBottomPane.call(this);
                !this.externalBottomPaneInitialized && this.statusBar && (this.commandHandler.supports(mcb) && Ncc(this.statusBar, {
                        name: "Terminal",
                        icon: "terminal",
                        command: mcb
                }),
                this.externalBottomPaneInitialized = !0)
        }
        ;
        g.initLeftPane = function() {
                function a() {
                        var f = c.runtime;
                        return !d.getEmbeddedClient() && (!f || f.kind !== "gce_unmanaged")
                }
                var b = this;
                O6.prototype.initLeftPane.call(this);
                hL.isDisabled() || (this.userSecrets || (this.userSecrets = new s$(this.getNotebookModel().getFileId(),this.getNotebookModel().getTraits().getSessionIndex(),"from google.colab import userdata\nuserdata.get('secretName')",function() {
                        RW(b, [qP("code", "from google.colab import userdata\nuserdata.get('secretName')")])
                }
                ),
                PUc(this).then(function(f) {
                        b.userSecrets.appendChild(f)
                })),
                this.pageStructure.leftPane.addTab("Secrets", this.userSecrets, hL));
                var c = this.getKernel()
                  , d = this.appModel
                  , e = {
                        changed: new $fb(c,"user_credentials_allowed_changed",function() {
                                return c.areUserCredentialsAllowed()
                        }
                        ),
                        get value() {
                                return c.areUserCredentialsAllowed()
                        },
                        allowDriveMount: new agb(new $fb(c,"connected",a),a())
                };
                this.fileBrowser = new rQc(this,e);
                this.pageStructure.leftPane.addTab("Files", this.fileBrowser, tL);
                this.commandHandler.supports(rL) && (this.dataExplorerPane = new Z9(this.getPreferences().getValues().KAGGLE_CREDENTIALS,this.getOperativeNotebookSettings(),function(f) {
                        RW(b, [qP("code", f)])
                }
                ),
                this.pageStructure.leftPane.addTab("Data explorer", this.dataExplorerPane, rL));
                this.pageStructure.leftPane.addEventListener("colab-left-pane-close", function() {
                        b.fileBrowser.setDisplayed(!1);
                        uQc(b.fileBrowser, !1)
                });
                pVc(this);
                q5b(this.pageStructure.leftPane)
        }
        ;
        g.toggleLeftPane = function(a) {
                var b = a.command;
                var c = a.open === void 0 ? null : a.open;
                var d = a.userRequested === void 0 ? !1 : a.userRequested;
                a = a.source === void 0 ? void 0 : a.source;
                b === tL && uQc(this.fileBrowser, a === 42);
                O6.prototype.toggleLeftPane.call(this, {
                        command: b,
                        open: c,
                        userRequested: d,
                        source: a
                })
        }
        ;
        function pVc(a) {
                var b;
                w(function(c) {
                        if (a.scheduledNotebooksPane != null || !a.commandHandler.supports(vL))
                                return c.return();
                        a.notebookScheduler = new lNc(a);
                        b = new c7;
                        a.scheduledNotebooksPane = new q$(a.notebookScheduler,b);
                        a.pageStructure.leftPane.addTab("Schedule", a.scheduledNotebooksPane, vL, {
                                notifier: b
                        });
                        c.jumpToEnd()
                })
        }
        g.processCellMessage = function(a, b, c) {
                var d = this, e, f, h, k;
                return w(function(l) {
                        switch (c.action) {
                        case "view_file":
                                if (!d.kernelAccessAllowed(a, b))
                                        throw Error("Execution failed: the cell is not allowed to communicate with the runtime.");
                                e = c;
                                eVc(d, e.path, e.lineNumber);
                                break;
                        case "show_restart_runtime_warning":
                                if (!d.kernelAccessAllowed(a, b) || !yZ(a))
                                        throw Error("This code cell must be re-executed to allow runtime access.");
                                if (f = c.id) {
                                        if (d.pipWarningIds.has(f))
                                                break;
                                        d.pipWarningIds.add(f)
                                }
                                if (d.pipWarningDisplayed)
                                        break;
                                d.pipWarningDisplayed = !0;
                                h = new Vj;
                                k = h.format(Wj(h, "div", {
                                        style: "white-space: pre-wrap;"
                                }) + h.text(c.warning) + Yj(h, "div"));
                                jN({
                                        title: "Restart session",
                                        message: V(xUc, tM(k)),
                                        yesText: "Restart session",
                                        noText: "Cancel"
                                }).then(function(m) {
                                        SO(36, m ? "restarted" : "canceled");
                                        m && d.getKernel().restart()
                                }).finally(function() {
                                        d.pipWarningDisplayed = !1
                                });
                                break;
                        case "window_open":
                                if (d.isCloudEmbedded && d.embeddedClient)
                                        return l.return(d.embeddedClient.openUrl(c.url));
                                if (!d.kernelAccessAllowed(a, b))
                                        throw Error("Execution failed: the cell is not allowed to communicate with the runtime.");
                                return l.return(O6.prototype.processCellMessage.call(d, a, b, c));
                        default:
                                return l.return(O6.prototype.processCellMessage.call(d, a, b, c))
                        }
                        return l.return(void 0)
                })
        }
        ;
        function eVc(a, b, c) {
                var d, e, f, h;
                w(function(k) {
                        switch (k.nextAddress) {
                        case 1:
                                if (!a.kernelFiles)
                                        return kM({
                                                message: "Must be connected to a runtime to view files."
                                        }),
                                        k.return();
                                k.setCatchFinallyBlocks(2);
                                return k.yield(a.kernelFiles.getFile(b), 4);
                        case 4:
                                d = k.yieldResult;
                                if (d.isDirectory) {
                                        a.toggleLeftPane({
                                                command: tL,
                                                open: !0,
                                                userRequested: !0
                                        });
                                        a.fileBrowser && a.fileBrowser.selectDirectory(d);
                                        k.jumpTo(5);
                                        break
                                }
                                return k.yield(a.fileViewerManager.open(d, {
                                        lineNumber: c
                                }), 6);
                        case 6:
                                (e = k.yieldResult) && SO(3, "file_view_line", d.mimeType);
                        case 5:
                                k.leaveTryBlock(0);
                                break;
                        case 2:
                                return f = k.enterCatchBlock(),
                                h = d ? d.name : b,
                                kM({
                                        message: j9a(h)
                                }),
                                PO(f),
                                k.return()
                        }
                })
        }
        g.getAuthorship = function() {
                return this.getNotebookModel().getAuthorship().catch(function(a) {
                        PO(a);
                        return null
                })
        }
        ;
        function nVc(a, b, c) {
                c = c === void 0 ? !1 : c;
                var d, e, f, h, k, l, m;
                return w(function(n) {
                        switch (n.nextAddress) {
                        case 1:
                                return n.yield(a.getKernel().changeCredentialPropagation({
                                        credsType: b,
                                        action: "propagate",
                                        dryRun: !0
                                }), 2);
                        case 2:
                                d = n.yieldResult;
                                e = "";
                                !d.success && d.oauthConsentUrl && (e = d.oauthConsentUrl);
                                f = e || c;
                                if (!f) {
                                        n.jumpTo(3);
                                        break
                                }
                                a: {
                                        switch (b) {
                                        case "dfs_ephemeral":
                                                var p = {
                                                        title: "Permit this notebook to access your Google Drive files?",
                                                        message: "This notebook is requesting access to your Google Drive files. Granting access to Google Drive will permit code executed in the notebook to modify files in your Google Drive. Make sure that you review the notebook code prior to allowing this access.",
                                                        yesText: "Connect to Google Drive",
                                                        noText: "No, thanks"
                                                };
                                                break a;
                                        case "dfs_persistent":
                                                p = {
                                                        title: "Permit this notebook to access your Google Drive files?",
                                                        message: "Connecting to Google Drive will permit code executed in this notebook to modify files in your Google Drive until access is otherwise revoked.",
                                                        yesText: "Connect to Google Drive",
                                                        noText: "No, thanks"
                                                };
                                                break a;
                                        case "auth_user_ephemeral":
                                                p = {
                                                        title: "Allow this notebook to access your Google credentials?",
                                                        message: "This will allow the code executed in this notebook to access your Google Drive and Google Cloud data. Review the code in this notebook prior to allowing access.",
                                                        yesText: "Allow",
                                                        noText: "No, thanks"
                                                };
                                                break a;
                                        default:
                                                ad(b)
                                        }
                                        p = void 0
                                }
                                h = jN(p);
                                return n.yield(qVc(a), 4);
                        case 4:
                                return n.yield(h, 5);
                        case 5:
                                k = n.yieldResult;
                                if (!k)
                                        return n.return(new $$(!1,{
                                                fallbackReason: "canceled"
                                        }));
                                if (!e) {
                                        n.jumpTo(3);
                                        break
                                }
                                return n.yield(rVc(e), 7);
                        case 7:
                                if (l = n.yieldResult)
                                        return n.return(l);
                        case 3:
                                return n.yield(a.getKernel().changeCredentialPropagation({
                                        credsType: b,
                                        action: "propagate",
                                        dryRun: !1
                                }), 8);
                        case 8:
                                return m = n.yieldResult,
                                m.success ? n.return(new $$(!0)) : n.return(new $$(!1,{
                                        fallbackReason: "unknown"
                                }))
                        }
                })
        }
        g.getProxyUrlForPort = function(a, b, c, d) {
                d = d === void 0 ? null : d;
                var e = this, f;
                return w(function(h) {
                        switch (h.nextAddress) {
                        case 1:
                                if (!e4a || c) {
                                        h.jumpTo(2);
                                        break
                                }
                                h.setCatchFinallyBlocks(3);
                                return h.yield(e.getKernel().proxyPort(a), 5);
                        case 5:
                                return h.return(h.yieldResult);
                        case 3:
                                f = h.enterCatchBlock();
                                if (!rH)
                                        throw f;
                                console.warn("Falling back to proxy URL for proxying port " + a + " due to error: " + f);
                        case 2:
                                return h.return(O6.prototype.getProxyUrlForPort.call(e, a, b, c, d))
                        }
                })
        }
        ;
        function rVc(a) {
                var b, c, d, e, f, h;
                return w(function(k) {
                        switch (k.nextAddress) {
                        case 1:
                                b = new oo;
                                k.setFinallyBlock(2);
                                c = lM(a, "_blank", "width=600, height=500");
                                if (!c)
                                        return k.return(new $$(!1,{
                                                fallbackReason: "consent-popup-failure"
                                        }));
                                d = new Promise(function(l) {
                                        b.listen(window, "message", function(m) {
                                                m = m.event_;
                                                m.source === c && m.origin === window.origin && m.data && (m = m.data,
                                                m.success !== void 0 && l({
                                                        action: m.success ? "accepted" : "rejected",
                                                        errorReason: m.errorReason || ""
                                                }))
                                        })
                                }
                                );
                                e = new Promise(function(l) {
                                        $db(c, {
                                                msBeforeReject: 36E5
                                        }).then(function() {
                                                l({
                                                        action: "closed",
                                                        errorReason: ""
                                                })
                                        })
                                }
                                );
                                return k.yield(Promise.race([d, e]), 4);
                        case 4:
                                if (f = k.yieldResult,
                                console.log('result was "' + f.action + '" errorReason: ' + f.errorReason),
                                f.action === "accepted")
                                        try {
                                                c.close()
                                        } catch (l) {
                                                PO(l, "close consent window")
                                        }
                                else
                                        return h = "popup-" + f.action + "-" + f.errorReason,
                                        k.return(new $$(!1,{
                                                fallbackReason: h
                                        }));
                        case 2:
                                k.enterFinallyBlock();
                                b.removeAll();
                                k.leaveFinallyBlock(3);
                                break;
                        case 3:
                                return k.return()
                        }
                })
        }
        function qVc(a) {
                var b, c, d, e, f;
                return w(function(h) {
                        if (h.nextAddress == 1) {
                                if (!a.getOperativeNotebookSettings().DESKTOP_NOTIFICATIONS.getValue() || !window.Notification || document.hasFocus())
                                        return h.return();
                                b = !0;
                                return window.Notification.permission !== "default" ? h.jumpTo(2) : h.yield(window.Notification.requestPermission(), 3)
                        }
                        h.nextAddress != 2 && (c = h.yieldResult,
                        b = c !== "denied");
                        if (!b)
                                return h.return();
                        d = nJ.FAVICON.DEFAULT;
                        e = d.toString();
                        f = new window.Notification("Notebook execution requires authorisation",{
                                body: "Manage authorisation to resume execution",
                                icon: e,
                                silent: !1
                        });
                        window.addEventListener("focus", function() {
                                f.close()
                        }, {
                                once: !0
                        });
                        f.onclick = function() {
                                window.focus();
                                f.close()
                        }
                        ;
                        h.jumpToEnd()
                })
        }
        g.setIsDriveMounted = function(a) {
                var b = this;
                w(function(c) {
                        return a ? c.return(b.mountDrive()) : c.return(sVc(b))
                })
        }
        ;
        g.mountDrive = function() {
                var a = this, b, c, d, e, f, h, k, l;
                return w(function(m) {
                        switch (m.nextAddress) {
                        case 1:
                                if (a.isAgentMode())
                                        return kM({
                                                message: "Mounting your Google Drive is not allowed in agent mode.",
                                                actionLink: {
                                                        message: "Learn more",
                                                        action: "https://research.google.com/colaboratory/faq.html#data-science-agent"
                                                }
                                        }),
                                        m.return();
                                b = a.getKernel().runtime;
                                if (a.getNotebookModel().getSyntaxLanguage() !== "notebook-python" || b && b.kind === "local")
                                        return kM({
                                                message: "Mounting your Google Drive is only available on hosted Python runtimes."
                                        }),
                                        m.return();
                                c = iM({
                                        message: "Mounting Google Drive\u2026",
                                        timeoutMillis: -1
                                });
                                m.setCatchFinallyBlocks(2, 3);
                                return m.yield(a.isSoleAuthored(), 5);
                        case 5:
                                return (d = m.yieldResult) ? m.yield(nVc(a, "dfs_persistent", !0), 6) : m.return(tVc(a, "shared"));
                        case 6:
                                e = m.yieldResult;
                                if (!e.propagated)
                                        return m.return(tVc(a, e.fallbackReason));
                                f = a.getKernel();
                                h = CO("mount_drive_duration");
                                k = f.mountDrive({
                                        traceDetails: h,
                                        notification: c
                                });
                                m.setFinallyBlock(7);
                                return m.yield(k, 7);
                        case 7:
                                m.enterFinallyBlock(2, 3);
                                SO(18, "mount_drive_from_file_browser", void 0, [h]);
                                m.leaveFinallyBlock(8);
                                break;
                        case 8:
                                return a.fileBrowser && tQc(a.fileBrowser),
                                m.return();
                        case 3:
                                m.enterFinallyBlock();
                                c.clear();
                                m.leaveFinallyBlock(0);
                                break;
                        case 2:
                                return l = m.enterCatchBlock(),
                                kM({
                                        message: "An error was encountered when permitting access for this notebook to Google Drive."
                                }),
                                PO(l),
                                m.return(tVc(a, "unknown"))
                        }
                })
        }
        ;
        function tVc(a, b) {
                var c, d;
                return w(function(e) {
                        a.ensureNotebookVisible();
                        SO(18, "mount_drive_cell", "reason=" + b);
                        if (c = vxc(a))
                                return uVc(a, c),
                                c.isFocused() ? c.scrollIntoView() : a.focusCell(c.getId()),
                                e.return();
                        RW(a, [qP("code", "from google.colab import drive\ndrive.mount('/content/drive')")]);
                        d = vxc(a);
                        uVc(a, d);
                        e.jumpToEnd()
                })
        }
        function sVc(a) {
                var b, c, d, e;
                return w(function(f) {
                        switch (f.nextAddress) {
                        case 1:
                                return f.yield(a.getAuthorship(), 2);
                        case 2:
                                return b = {
                                        title: "Revoke access to Google Drive for this notebook?",
                                        message: "For this notebook, you have previously allowed Colab backends to access your Google Drive files. Would you like to revoke this access?",
                                        yesText: "Revoke access and assign a new runtime",
                                        noText: "No, thanks"
                                },
                                f.yield(jN(b), 3);
                        case 3:
                                c = f.yieldResult;
                                if (!c)
                                        return f.return();
                                f.setCatchFinallyBlocks(4);
                                return f.yield(a.getKernel().changeCredentialPropagation({
                                        credsType: "dfs_persistent",
                                        action: "revoke",
                                        dryRun: !1
                                }), 6);
                        case 6:
                                f.leaveTryBlock(0);
                                break;
                        case 4:
                                return d = f.enterCatchBlock(),
                                kM({
                                        message: "An error was encountered when revoking access for this notebook to Google Drive."
                                }),
                                PO(d),
                                f.setCatchFinallyBlocks(7),
                                f.yield(a.getKernel().unassignCurrentVm({
                                        skipConfirm: !0
                                }), 9);
                        case 9:
                                f.leaveTryBlock(0);
                                break;
                        case 7:
                                e = f.enterCatchBlock(),
                                PO(e),
                                f.jumpToEnd()
                        }
                })
        }
        function uVc(a, b) {
                var c, d, e;
                w(function(f) {
                        if (f.nextAddress == 1)
                                return c = !1,
                                a.getHandler().listenOnce(b, "manual-execute", function() {
                                        c = !0;
                                        a.driveMountTooltip && a.driveMountTooltip.close()
                                }),
                                d = b.getElement().querySelector(".cell-execution-indicator,colab-run-button"),
                                a.driveMountTooltip && a.driveMountTooltip.opened || !d || c ? f.return() : f.yield(d.updateComplete, 2);
                        e = V(yUc, nJ.FAQ, "Learn more");
                        a.driveMountTooltip = Gvb({
                                content: V(zUc, "Run this cell to mount your Google Drive.", e),
                                target: d
                        });
                        f.jumpToEnd()
                })
        }
        g.showPreferencesDialog = function(a) {
                var b = this.getPreferences().getValues()
                  , c = new n0(0,"Site",b.siteSettings)
                  , d = new n0(1,"Editor",b.editorSettings);
                c = [c, d];
                iH || (b = new HZb(2,"Miscellaneous",b.miscSettings),
                c.push(b));
                u5a && (b = new pRc(this.getPreferences()),
                c.splice(c.length - 1, 0, b));
                this.isCloudEmbedded || (b = new X$(this.getSubscription()),
                c.splice(2, 0, b),
                b = new eRc(this.getPreferences().getValues()),
                c.splice(c.length - 1, 0, b),
                b6a && (b = new rIc(this.getPreferences()),
                c.splice(c.length - 1, 0, b)),
                wH && (b = new a7(this.getPreferences().getValues(),this.getNotebookModel()),
                c.splice(2, 0, b)));
                Oac(this.getPreferences().getValues(), c, a)
        }
        ;
        g.toggleResourceViewer = function(a) {
                a = O6.prototype.toggleResourceViewer.call(this, a === void 0 ? !1 : a);
                if (this.isCloudEmbedded)
                        return a;
                var b = this.appModel.paidResourceMonitor;
                if (a) {
                        var c = a.querySelector("colab-paid-resources");
                        c ? c.requestUpdate() : (c = a.contentParent,
                        c.insertBefore(new i$(this.getSubscription(),b,this.getKernel(),this.commandHandler), c.firstChild))
                }
                return a
        }
        ;
        g.shouldShowManageSessionsButtonInUsageDisplay = function() {
                return !1
        }
        ;
        function vVc(a) {
                a = t(a);
                for (var b = a.next(), c = {}; !b.done; c = {
                        code$jscomp$145: void 0
                },
                b = a.next())
                        if (c.code$jscomp$145 = b.value.code,
                        GUc.some(function(d) {
                                return function(e) {
                                        return d.code$jscomp$145.includes(e)
                                }
                        }(c)))
                                return !0;
                return !1
        }
        function wVc(a) {
                try {
                        var b = t(a)
                          , c = b.next();
                        for (a = {}; !c.done; a = {
                                code$jscomp$146: void 0
                        },
                        c = b.next())
                                if (a.code$jscomp$146 = c.value.code,
                                EUc.some(function(d) {
                                        return function(e) {
                                                return d.code$jscomp$146.includes(e)
                                        }
                                }(a)) || FUc.some(function(d) {
                                        return function(e) {
                                                return d.code$jscomp$146.search(e) !== -1
                                        }
                                }(a)))
                                        return !0
                } catch (d) {}
                return !1
        }
        g.maybeWarnUser = function(a) {
                var b = this, c, d, e, f, h, k, l, m, n;
                return w(function(p) {
                        switch (p.nextAddress) {
                        case 1:
                                c = b.getKernel().runtime;
                                if (((d = c) == null ? void 0 : d.kind) != null && ((e = c) == null ? void 0 : e.kind) !== "gce")
                                        return p.return(void 0);
                                f = new URL(nJ.FAQ + "#limitations-and-restrictions");
                                if (!wVc(a) || b.hasWarnedAboutSuspiciousCode) {
                                        p.jumpTo(2);
                                        break
                                }
                                var q = p.yield;
                                var v = "You may be executing code that is disallowed, and this may restrict your ability to use Colab in the future. Please note the prohibited actions specified in our " + Wj(rJ, "a", {
                                        href: f.toString(),
                                        target: "_blank"
                                }) + "FAQ" + Yj(rJ, "a") + ". ";
                                v = rJ.format(v);
                                return q.call(p, jN({
                                        title: "Warning",
                                        message: V(AUc, tM(v)),
                                        yesText: "Cancel execution",
                                        noText: "Continue anyway"
                                }), 3);
                        case 3:
                                return h = p.yieldResult,
                                h || (b.hasWarnedAboutSuspiciousCode = !0),
                                p.return({
                                        cancelExecution: h
                                });
                        case 2:
                                l = (k = b.appModel.paidResourceMonitor.lastFetched()) && k.balance <= 0;
                                if (!l || !vVc(a) || b.hasWarnedAboutCodeDisallowedOnFreeOfChargeTier) {
                                        p.jumpTo(4);
                                        break
                                }
                                b.getSubscription();
                                m = tO().includes(1);
                                q = p.yield;
                                v = "You may be executing code that is disallowed. This may terminate your runtime without warning.  Colab prioritises interactive notebook compute and disallows some types of usage when executing code without compute units, as outlined in the " + Wj(rJ, "a", {
                                        href: f.toString(),
                                        target: "_blank"
                                }) + "FAQ" + Yj(rJ, "a") + ".";
                                v = rJ.format(v);
                                return q.call(p, jN({
                                        title: "Warning",
                                        message: V(CUc, tM(v), m ? V(BUc, R9a(k.formattedBalance), nJ.signupPricingPageUrl({
                                                utmParams: {
                                                        source: "dialog",
                                                        campaign: "disallowed_warning"
                                                }
                                        }), "Purchase more") : ""),
                                        yesText: "Cancel execution",
                                        noText: "Continue anyway"
                                }), 5);
                        case 5:
                                return n = p.yieldResult,
                                n || (b.hasWarnedAboutCodeDisallowedOnFreeOfChargeTier = !0),
                                p.return({
                                        cancelExecution: n
                                });
                        case 4:
                                return p.return(void 0)
                        }
                })
        }
        ;
        g.getFooter = function() {
                if (!this.isCloudEmbedded) {
                        var a = nJ.signupPricingPageUrl({
                                utmParams: {
                                        source: "footer",
                                        campaign: "footer_links"
                                }
                        });
                        return V(DUc, a, "Colab paid products", "Cancel contracts here")
                }
        }
        ;
        g.observeComposerHeight = function(a) {
                var b = this
                  , c = this.element_.querySelector(".footer-links");
                if (c) {
                        var d = getComputedStyle(c).paddingBottom;
                        (new ResizeObserver(function(e) {
                                e = e[0].borderBoxSize[0].blockSize;
                                var f;
                                ((f = b.composerStore) == null ? void 0 : f.viewMode) === "floating" && e > 0 ? c.style.paddingBottom = e + 24 + "px" : c.style.paddingBottom = d
                        }
                        )).observe(a, {
                                box: "border-box"
                        })
                }
        }
        ;
        g.getCodeGenerationMethod = function() {
                if (!this.isCloudEmbedded)
                        return O6.prototype.getCodeGenerationMethod.call(this);
                if (yJ().canGenerateCodeWithComposer)
                        return "composer";
                if (yJ().canGenerateCode)
                        return "inline"
        }
        ;
        g.commentOnCell = function(a) {
                if (this.isCommentable() && this.isCloudEmbedded) {
                        var b;
                        (b = this.embeddedClient) == null || b.commentOnCell(a.getId())
                } else
                        O6.prototype.commentOnCell.call(this, a)
        }
        ;
        g.canSuggestFixes = function(a, b) {
                return this.isCloudEmbedded && !yJ().canFixErrors ? !1 : O6.prototype.canSuggestFixes.call(this, a, b)
        }
        ;
        function SUc(a, b, c) {
                var d, e, f, h, k, l;
                return w(function(m) {
                        switch (m.nextAddress) {
                        case 1:
                                return d = a.getKernel(),
                                e = b === 0,
                                h = (f = a.getKernel().isConnected()) ? "connected" : a.getKernel().getState(),
                                e || d.setState("allocating"),
                                k = a.getNotebookModel().getAccelerator() !== "",
                                m.setCatchFinallyBlocks(2),
                                m.yield(a.embeddedClient.connect({
                                        reason: b,
                                        isConnected: f,
                                        isRequestingGpu: k,
                                        hint: c
                                }), 4);
                        case 4:
                                return c = m.yieldResult,
                                c ? m.yield(TUc(a, c, {
                                        skipCreation: e
                                }), 5) : (d.setState("connect"),
                                m.return());
                        case 5:
                                return m.return();
                        case 2:
                                l = m.enterCatchBlock();
                                if (l instanceof ZG)
                                        throw d.setState(h),
                                        l;
                                VUc(l);
                                throw l;
                        }
                })
        }
        function VUc(a) {
                kM(Object.assign({}, {
                        message: "Unable to connect to the runtime.",
                        timeoutMillis: 1E4
                }, a instanceof TypeError ? {
                        actionLink: {
                                message: "Learn more",
                                action: "https://cloud.google.com/colab/docs/troubleshooting#unable-to-connect-third-party-cookies"
                        }
                } : {}))
        }
        function MUc(a) {
                var b = a.getOperativeNotebookSettings().getNumericUserActivityTracking(7);
                !a.getOperativeNotebookSettings().HIDE_AI_FEATURES.getValue() && a.getOperativeNotebookSettings().INLINE_COMPLETIONS.getValue() && S4a && b < U4a && (kM({
                        message: "Boost your productivity and code accuracy with AI-powered autocomplete!",
                        timeoutMillis: 1E4,
                        actionLink: {
                                message: "Enable",
                                action: function() {
                                        return w(function(c) {
                                                return c.yield(LX(a, 20), 0)
                                        })
                                }
                        }
                }),
                a.getOperativeNotebookSettings().setUserActivityTracking(7, b + 1))
        }
        function $$(a, b) {
                b = b === void 0 ? {} : b;
                b = b.fallbackReason === void 0 ? "" : b.fallbackReason;
                this.propagated = a;
                this.fallbackReason = b
        }
        var iVc = {
                KERNEL_DRIVE_HEALTH_CHECK_INTERVAL_MILLIS: 6E4
        };
        Sa("colab.external.Notebook.config", iVc);
        Q8a();
        var xVc = xr()
          , yVc = new s9(xVc);
        (new V7(yVc,function() {
                return Promise.resolve(function(a) {
                        var b = a.notebookModel instanceof YCc ? a.notebookModel.embeddedClient : void 0;
                        if (a.embeddedMode)
                                var c = new Z6;
                        else
                                c = a.accessHistory,
                                c = b ? new BPc(c,b) : new V6(c);
                        var d;
                        a = new HUc({
                                commandHandler: c,
                                notebookModel: a.notebookModel,
                                appModel: a.appModel,
                                preferences: a.preferences,
                                embeddedMode: a.embeddedMode,
                                accessHistory: (d = a.accessHistory) != null ? d : void 0
                        },b);
                        c instanceof V6 && c.init(a, a.getOperativeNotebookSettings());
                        return a
                })
        }
        )).initialize();
}
).call(this);
